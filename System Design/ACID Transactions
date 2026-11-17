
ACID transactions
1. A is Atomicity, not “autonomous”. It means all or nothing: every write in the transaction happens, or none does.
2. Consistency means the data always obeys its rules, such as “a balance is never negative”. “Fail gracefully” belongs to atomicity. It is also a different thing from consistency in distributed systems, where it means all replicas show the same data.
3. Isolation: “treats the latest data before it” is vague. Say that each transaction behaves as if it were the only one running.
4. The write-ahead log directly gives atomicity and durability. Consistency follows from those two plus the rules you define, so it is indirect.

8. ACID transactions
* Transaction: a group of reads and writes treated as one unit. It ends with a commit (keep everything) or a rollback (undo everything).
* Example: transferring $100 from A to B is two writes, subtract from A and add to B. One must never happen without the other.
	Meaning	In the transfer example
Atomicity	All or nothing: every write happens, or none does	A crash after “subtract from A” undoes it, so no money vanishes
Consistency	The data obeys its rules before and after	A transfer that would make a balance negative is rejected
Isolation	Concurrent transactions don’t interfere; each behaves as if it ran alone	Two transfers from A at the same moment can’t both spend the same $100
Durability	Once committed, the data survives a crash	After “transfer complete”, a power cut doesn’t lose it

 8. Read Committed Isolation | Systems Design Interview: 0 to 1 with Google Software Engineer
* What it is: the basic isolation level, with two guarantees. It is the default in Postgres.
    1. No dirty reads: you only see committed data.
    2. No dirty writes: you only overwrite committed data.
Dirty write
* Problem: two transactions update the same two rows at the same time and their writes interleave. We end up with row 1 from one transaction and row 2 from the other, a mix nobody intended. Example: two people buy the last ticket at once, and the ticket row says Bob owns it while the payment row charges Alice.
* Fix: a row lock. A transaction locks each row it writes and holds the lock until it commits or rolls back. Anyone else writing that row waits.
Dirty read
* Problem: a transaction reads another transaction’s writes before they are committed. Example: I send $10 to my mom. A read in the middle sees the $10 gone from my account and not yet in hers. If the transfer rolls back, that reader saw data that never existed.
* Fix: while a write is in progress, the DB keeps two values, the old committed one and the new uncommitted one. Readers get the old value until the writer commits, and then the DB switches to the new one.
* Why not a lock for reads too: one slow write would block every reader of that row.
What it does not prevent: other race conditions. For example, two reads inside one transaction can return different values because someone else committed in between. The stronger isolation levels in the next videos deal with those.

9. Snapshot isolation
* The problem (read skew): read committed only promises that each read sees committed data. A transaction that makes several reads can still see a mix of before and after.
    * I have $500 in each of two accounts. While I’m checking them, a transfer of $100 from account B to account A commits.
    * I read account A before the transfer and see $500.
    * I read account B after the transfer and see $400.
    * The total looks like $900, so $100 seems to have vanished. Every read was of committed data, so read committed allows this.
* Why it matters: it is a nuisance for one page view and serious for long reads. A backup or analytics query that runs for an hour would capture a mix of old and new data.
* The idea: each transaction sees the database frozen as it was when the transaction started. Whatever others commit in the meantime is invisible to it. In the example, both reads show $500.
* How (MVCC, multi-version concurrency control):
    * A write does not overwrite a row. It adds a new version, tagged with the ID of the transaction that wrote it, and IDs increase over time.
    * A transaction reads the newest version that was committed before it started, and ignores anything newer.
    * Old versions are deleted once no running transaction needs them.
* Benefit: readers never block writers, and writers never block readers. Writers still lock rows against each other, as in read committed.
* Naming: Postgres and MySQL call this level “repeatable read”.
* What it does not prevent: races where two transactions both read the same data and then both write based on what they read. That is the next video.
* In an interview: “Reads run on a consistent snapshot using MVCC, so long reads such as analytics don’t block writes.”


10. Write skew and phantoms
Write skew
* What it is: two transactions read the same data, each decides based on it, and each writes a different row. Each write is fine alone, and together they break a rule.
* Example: the rule is that at least one doctor is on call. Alice and Bob are both on call and both ask for a break at the same moment.
    1. Alice’s transaction checks and sees 2 doctors on call, so she may leave.
    2. Bob’s transaction checks and sees 2 doctors on call, so he may leave.
    3. Alice sets her row to off, and Bob sets his row to off.
    4. Nobody is on call.
* Why the earlier protections miss it: they write different rows, so their row locks never collide. With snapshot isolation, each one keeps seeing “2 on call” in its own snapshot.
* Fix: lock the rows you read, not just the row you write. In SQL this is SELECT ... FOR UPDATE on all on-call doctors. The second transaction waits, then sees only one doctor on call and does not leave.
Phantom
* What it is: the same kind of race, but the decision is based on rows that don’t exist yet, so there is nothing to lock.
* Example: two people check “is there a booking for room 5 at 12:00?” Both see none, both insert a booking, and the room is double-booked.
* Fixes:
    * Create the rows in advance: one row per room per time slot, so there is a row to lock.
    * Unique constraint: make (room, time slot) unique, and the DB rejects the second insert.
    * Serializable isolation: the strongest level, covered in the next videos.
In an interview: this is the double-booking problem in ticket, hotel and seat-booking designs. The standard answer is rows that exist in advance (one row per seat) plus a lock or a unique constraint.


Serial execution

Idea: races only happen when transactions overlap. So the database runs every transaction on one thread, one at a time, from start to finish. With no overlap there are no conflicts and no locks.
Clients: any number of app servers can send transactions. They wait in a queue, and the thread takes them one by one.
The rule: while the thread waits for anything, every other transaction waits too. So it needs:
All the data in RAM, so a transaction never waits for the disk.
Short transactions, because one slow transaction blocks everyone behind it.
Stored procedures. A transaction with several steps is saved in the database as code and run with one call. Otherwise the thread would sit idle between steps, waiting for the app to send its next command over the network.
Cons:
Capped at one CPU core. To go further, split the data into partitions with one thread each. That only works while each transaction stays inside one partition. Transactions across partitions are much slower.
Data size is limited by RAM.
Stored procedures are hard to maintain. The logic lives in the database and not in your codebase, so it is harder to test, version and debug. A slow one also blocks the whole database.
Example: Redis runs commands one at a time on a single thread. That is why a single command or script is atomic without locks.

12. Serializable isolation: two-phase locking (2PL)
Idea: transactions run at the same time, but locks make readers and writers of the same row wait for each other. The result is serializable.

How it works

Read lock (shared): taken automatically on every row a transaction reads. Many transactions can hold it at once.
Write lock (exclusive): taken automatically on every row a transaction writes. You only get it when nobody else holds any lock on the row. While you hold it, nobody else can read or write that row.
Two phases: a transaction takes locks while it runs (phase 1), and releases them all at once when it commits or aborts (phase 2).
Result: nothing you read can change until you finish, so none of the races in sections 8 to 10 can happen. Phantoms need one more kind of lock, covered below.

Deadlocks

Problem: Alice and Bob both read both doctor rows, so each holds a read lock on both. Each now wants a write lock on their own row, but the other’s read lock blocks it. They wait for each other forever.
Fix: the database detects the waiting cycle, aborts one transaction, and the app retries it. The retry sees only 1 doctor on call and stays, so the write skew never happens.

Phantoms

Problem: a row that doesn’t exist yet has no lock to take.
Predicate lock: lock the query’s condition itself, for example “bookings for room 5 at 12:00”. Any insert, update or delete that matches it has to wait, even for rows that don’t exist yet. It’s precise but slow, because every write is checked against all the active conditions.
Index-range lock: lock a range of an index that covers the condition, for example all bookings for room 5 at any time. It blocks some writes it didn’t need to, but the check is fast, so this is what databases use in practice. If there is no suitable index, the database locks the whole table.

Main con: it’s slow

Readers and writers wait for each other. In snapshot isolation they never do.
A slow transaction holds its locks until it ends, and blocks everyone who touches those rows.
Throughput is much lower, response times are unpredictable, and each deadlock throws away the aborted transaction’s work.


13. SSI is snapshot isolation plus one check at commit. If someone else changed something you read and committed before you, your transaction is aborted and the app retries it.

How it works

Every transaction reads from its own snapshot, exactly as in snapshot isolation. Readers and writers never wait for each other.
The database notes what each transaction read. It uses index ranges, as in 2PL, so phantoms are covered too. These notes never block anyone; they only raise a warning when someone writes to something that was read.
When a transaction commits, the database asks one question: did another transaction change something you read, and commit before you?
If yes, your decision may be based on old data, so your transaction is aborted and the app retries it with a fresh snapshot.
If no, you commit.

The doctors, step by step

Alice and Bob both start, and both read “2 on call”. The database notes that both of them read the on-call rows.
Alice sets her row to off call. Bob read that row, so the database warns Bob that what he read may be out of date.
Bob sets his row to off call. Alice read that row, so Alice gets the same warning.
Alice commits first. Bob’s change hasn’t committed yet, so nothing Alice read has really changed, and her commit succeeds.
Bob tries to commit. Alice’s change to a row he read has now committed, so his “2 on call” is out of date. Bob is aborted.
The app retries Bob’s transaction. His new snapshot shows 1 on call, so he stays.

The first to commit wins, and the later one retries.

The two cases in the video. The video splits the check by timing. Either the other transaction wrote before your read (your snapshot hid the change because it wasn’t committed yet), or it wrote after your read. Both lead to the same question at commit, so you don’t need to tell them apart.

Why it’s called optimistic. 2PL is pessimistic: transactions that touch the same rows wait for each other up front, even when the result would have been fine. SSI assumes things will be fine and lets everyone run. It pays only when it detects a conflict, and the price is the aborted transaction’s wasted work. In the doctors example both methods end the same way, with one doctor retried. The difference is the waiting along the way.

Pros:
Readers and writers never wait for each other, so response times stay steady and long reports run smoothly.
It isn’t capped at one CPU core, unlike serial execution.
Cons:
Each abort wastes work, and the app must retry.
With many conflicts (many transactions fighting over the same rows), most of them abort, and it gets slower than 2PL.
Long transactions that write are likely to be aborted, so keep them short.
To keep tracking cheap, it sometimes aborts harmless transactions too.
Used in: the serializable level of Postgres.
