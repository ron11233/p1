25. Partitioning: intro

(24 was the replication summary video, which has no notes of its own.)

Partitioning (also called sharding): splitting the data into parts, each stored on a different machine. Each part holds different rows.
Why:
Storage: the data no longer fits on one machine.
Write throughput: one leader can't take all the writes, and replicas only scale reads (section 16).
With replication: each partition is replicated as usual, with its own leader and replicas. One machine can be the leader for some partitions and a follower for others.

The partition key is the column that decides which partition a row goes to. Choosing it is the main design decision: rows with the same key stay together, so queries by that key go to one partition.

1. By key range

Each partition holds a sorted range of keys, like the volumes of an encyclopedia: A to Al, Am to Bz, and so on.
The split points are chosen so each partition holds about the same amount of data.
Pros: range queries stay on one or a few partitions, for example all names from "Dan" to "Dav". Rows are sorted inside each partition.
Cons: access patterns can create hot spots. With a timestamp key, all of today's writes go to the last partition while the others sit idle.
Fix: put another column first, such as sensor ID and then timestamp, so each sensor's writes go to a different range.

2. By hash of the key

Hash the partition key, and give each partition a range of hash values. A good hash spreads the keys evenly.
Pros: data and load are spread evenly, with no hot ranges.
Cons: a range query has to ask every partition, because neighboring keys end up scattered.
A compromise, used by Cassandra: the key has two parts. The first part is hashed to choose the partition, and the second part sorts the rows inside it. With (user_id, created_at), all of a user's posts sit in one partition, sorted by time, so "Maya's posts this week" is a fast range query.

Hot keys: when even hashing doesn't help

One key can be hot on its own. A celebrity's post gets millions of likes, and they all go to the partition that holds that post.
Fix: add a random number from 00 to 99 to the hot key, so its writes spread over 100 partitions. Reads must collect and combine all 100 parts, so only do this for the few keys you know are hot.

Secondary indexes: querying by another column

	Local secondary index	Global secondary index
How	Each partition indexes only its own rows	A separate index covering all rows, itself partitioned by the indexed value. For example, heights under 6.3 on one partition and 6.3 or more on another
Writes	Touch one partition	Can touch several: the row's partition plus the index's partitions
Reads by the indexed column	Ask every partition and combine the answers (scatter-gather). Slow, and the slowest partition decides how long it takes	Go to one or a few partitions
The catch	Every such read is expensive	Keeping the index in sync across machines would need a distributed transaction, so it's usually updated asynchronously and can be briefly stale. DynamoDB works this way

What partitioning costs

Queries that don't use the partition key have to ask every partition.
Transactions and joins across partitions are slow and complex. Distributed transactions come later in the course.
A wrong partition key is expensive to fix later.

Back to consistent prefix (section 17): "keep related writes together" means choosing the partition key. Partition chat messages by chat_id, so a whole chat lives in one partition and its messages arrive in order.

In an interview: "I'd partition posts by a hash of user_id, so each user's posts live together, sorted by time within the partition. Each partition has its own leader and replicas. Queries by other columns use a global secondary index, updated asynchronously. For celebrity hot keys, I'd split the key with a random suffix."


26. Two-phase commit (2PC): distributed transactions
The problem: a transaction that writes to several partitions must commit on all of them or on none (atomicity, section 7). Sending "commit" to each partition separately isn't safe, because one can succeed while another fails, leaving half a transaction.
When you need it:
A write that touches several partitions, for example moving money between two users stored on different partitions.
Keeping a global secondary index in sync with the data, when the index must never be stale.
Writing to two different systems together, such as a database and a message queue.
Roles: the coordinator runs the protocol, and the participants are the partitions.

How it works

The app runs the transaction's writes on each participant as usual. Each participant locks the rows it changes.
Phase 1, prepare: the coordinator asks every participant, "Can you commit?" A participant that can saves its changes safely on disk and answers yes. Yes is a promise: from then on, it may not abort on its own, and it keeps its locks.
The decision: if every participant said yes, the decision is commit. If any said no or didn't answer, it's abort. The coordinator writes the decision to its own log on disk before telling anyone. That moment is the commit point, and the decision can't change after it.
Phase 2, commit: the coordinator tells every participant the decision. If one doesn't respond, the coordinator retries forever, because a commit decision must happen everywhere. The participants then release their locks.

Failures

A participant fails before answering yes: the coordinator aborts everyone. That's safe.
A participant fails after answering yes: when it restarts, its log says "prepared", so it asks the coordinator for the decision and applies it. Meanwhile, the coordinator keeps retrying. That's safe, just delayed.
The coordinator fails after the participants said yes: this is the real weakness.
The participants are in doubt. They promised, so they can't abort, and they don't know the decision, so they can't commit.
They wait, holding their locks, so other transactions that touch those rows wait too.
When the coordinator comes back, it reads its log. If the decision is there, it resends it. If not, it aborts.
If the coordinator's log is lost, someone has to fix things by hand.
That's why 2PC is called a blocking protocol: one machine's failure can freeze others.

Costs

It's slow: extra round trips between machines, extra disk writes on every transaction, and locks held while messages travel.
The coordinator is a single point of failure, unless it's replicated with consensus, which comes later in the course.

Avoiding it

Choose partition keys that keep a transaction's rows together, so most transactions touch only one partition.
Accept asynchronous updates where a short delay is fine, as with most global secondary indexes.
Split the work into steps that can be undone. This is called a saga. For example: take the money from A, then add it to B, and if the second step fails, give the money back to A. It ends up correct, but not instantly.

In an interview: "Moving credits between two users on different partitions needs both writes or neither, so I'd use two-phase commit. It's slow, and a crashed coordinator leaves rows locked. So I'd choose the partition key so that most transactions stay on one partition, and use 2PC only for the rare ones that cross partitions."

27. Consistent hashing: rebalancing partitions

The problem: rebalancing. When you add or remove a machine, some data has to move to it or away from it. The goal is to move as little data as possible and keep the load even.

The naive way breaks: hash(key) mod N

Say you have 4 machines and put each key on machine number hash mod 4. Now you add a fifth machine, so it becomes hash mod 5:

Key's hash	mod 4 (before)	mod 5 (after)
10	2	0
11	3	1
12	0	2
13	1	3
14	2	4

Every one of these keys moves. On average, going from 4 machines to 5 moves about 80% of all the data, just to add one machine.

Consistent hashing: the ring

Picture a clock numbered 0 to 99. After 99 it wraps back to 0.

Each machine gets a spot on the clock, by hashing its name: A at 10, B at 40, C at 70.
Each key also gets a spot, by hashing the key.
The rule: a key belongs to the first machine you reach going clockwise from the key's spot.
A key at 25 goes clockwise and reaches B at 40, so it's on B.
A key at 55 reaches C at 70, so it's on C.
A key at 85 wraps past 99 to 0 and reaches A at 10, so it's on A.
So each machine owns the stretch just before it: B owns 11 to 40, C owns 41 to 70, and A owns 71 to 99 plus 0 to 10.

Adding a machine: D lands at 55. Only the keys from 41 to 55 move, from C to D. Every other key stays where it was.

Removing a machine: if B leaves, only B's keys (11 to 40) move, to the next machine clockwise, which is C.

So adding or removing one machine moves only about 1/N of the data, instead of almost all of it.

Two problems with plain spots, and one fix

Uneven stretches: with only a few machines, random spots can give one machine 60% of the clock.
When a machine leaves, all its keys go to one neighbor, which suddenly has double the load.

The fix is virtual nodes. Each machine gets many spots instead of one, for example 100 spots each, all spread around the clock.

With so many small stretches, every machine ends up with about the same share.
When a machine leaves, its many small stretches go to many different neighbors, so the extra load is spread out.
A stronger machine can be given more spots, so it takes a bigger share.

Copies on the ring: a key is stored on the next 3 different machines clockwise from its spot. That's how leaderless stores like Cassandra pick a key's home replicas, the "home nodes" from the sloppy quorum story.

Finding a key: every server keeps the layout of the ring, so any server can work out where a key lives without asking anyone.

Another common approach: a fixed number of partitions

At the start, create many more partitions than machines, for example 1,000 partitions for 10 machines, so 100 each.
A new machine takes over whole partitions from the others. Keys never change partition; only which machine holds each partition changes.
The catch: you choose the number of partitions up front. Too few, and they become huge. Too many, and the bookkeeping costs more.
Elasticsearch and Riak work this way.

Used in: Cassandra, Riak and Amazon's Dynamo, and also in caches, to decide which cache server holds which key.

In an interview: "I'd place partitions on a consistent hashing ring with virtual nodes. Adding a machine moves only about 1/N of the keys, taken evenly from the existing machines, and each key's 3 replicas are the next 3 machines clockwise."


28. Linearizable databases

Linearizability, also called strong consistency: the system behaves as if there's only one copy of the data. Once anyone has seen a new value, everyone who reads after that sees it too, or something newer.

The story: a system that isn't linearizable

The final score of a match is saved: 2–1.
Alice refreshes. Her read goes to an up-to-date replica, which shows "Final: 2–1". She shouts it to Bob.
Bob refreshes after hearing her. His read goes to a replica that's behind, which shows "Still playing, 1–1".
Bob read after Alice in real time, but he saw older data. Each replica will catch up eventually, but the system isn't linearizable.

What linearizability requires

Every read and write seems to happen at a single instant, somewhere between when it was sent and when it returned.
Those instants follow real time. If one read finishes before another starts, the second can't see older data.
No flip-flopping: once any read returns the new value, no later read returns the old one.

How it compares with the guarantees you know

Guarantee	What it promises	For whom
Eventual consistency	The copies agree at some point	Nobody in particular
Read your own writes, monotonic reads, consistent prefix (section 17)	A sensible view of the data	One user at a time
Linearizability	The latest value, as if there were only one copy	Everyone, in real time

It isn't the same as serializability (sections 11 to 13)

Serializability is about transactions over many rows behaving as if they ran one at a time, in some order, not necessarily real-time order.
Linearizability is about a single value: reading it always returns the latest write.
A system with both is called strictly serializable, like Google's Spanner.
SSI reads from a snapshot, so it's serializable but not linearizable.

When you need it

Locks and leader election. Everyone must agree on who holds the lock or who the leader is; otherwise you get split brain (section 18). Coordination services such as ZooKeeper and etcd exist to provide exactly this.
"Only one" rules: unique usernames, no double booking, a balance that can't go below zero. Two machines must never both see "free". This is why CRDTs and multi-leader replication can't enforce these rules (sections 19 to 21).
Two channels racing each other. This was your mock's missed problem 2:
Maya creates a short link and posts it on social media, which is a second channel. A user in Asia clicks it before the Asian replica has the link. The social media post travelled faster than the replication did.
Another example: an app saves an image, then sends a "resize it" message through a queue. The resizer reads the image from a replica that doesn't have it yet.

Which setups can be linearizable

Setup	Linearizable?	Why
Single leader, reads from the leader	Yes, mostly	One copy decides. But asynchronous failover can lose writes, and split brain can create two leaders
Single leader, reads from replicas	No	Replicas lag behind
Consensus (Raft, Paxos; used by ZooKeeper and etcd)	Yes	Built to agree on one order of writes and to prevent split brain. Later in the course
Multi-leader	No	Two leaders can accept conflicting writes
Leaderless, with quorums	Not reliably	The edge cases from section 23: a read during a write can return the new value, then the old one

The cost

It's slower. Every linearizable read or write has to check with the leader or a majority of machines. Across regions, that means waiting on the network.
It's less available, which is the CAP theorem. A network partition is when the network splits the machines into groups that can't talk to each other. (Same word, different meaning from partitioning data.) When that happens, a linearizable system must refuse requests on the cut-off side, or risk two different "latest" values. You choose: consistent, which means refusing, or available, which means answering with possibly stale data.
So most systems use linearizability only where it's needed: locks, leader election, "only one" rules, and money.

In an interview: "Usernames must be unique, so registering one needs a linearizable check, through a single leader or a store built on consensus. The feed doesn't need that, because slightly stale is fine, so it can read from replicas and caches."


29. Raft: leader election

What Raft is for: keeping several servers in agreement on one log of writes, safely. This video covers how they choose a leader; the next one covers writes.

The pieces

Three roles: every server is a follower, a candidate (asking for votes), or the leader.
Terms: time is split into numbered terms, and each term starts with an election. There's at most one leader per term. A higher term always wins: any server that sees a higher term than its own updates to it and becomes a follower.
Heartbeats: the leader sends every follower an "I'm alive" message about every 50 ms.
Election timeout: each follower waits for heartbeats. If none arrives within its timeout, it assumes the leader is gone. Each server picks its own random timeout, for example somewhere between 150 and 300 ms.

The election, step by step. There are 5 servers, S1 to S5. S1 is the leader in term 3.

S1 crashes, and its heartbeats stop.
Each follower's random timeout starts running. S3's happens to be the shortest, so it runs out first.
S3 becomes a candidate. It moves to term 4, votes for itself, and asks the others for their votes.
S2, S4 and S5 haven't voted in term 4 yet, and S3's log is at least as up to date as theirs, so they vote yes. S3 now has 4 votes. It needs a majority, 3 out of 5, so it becomes the leader of term 4.
S3 starts sending heartbeats. The others reset their timeouts and stay followers.

The voting rules

One vote per term, given to the first candidate that asks.
Refuse a candidate whose log is behind yours.
A candidate needs votes from a majority of all servers, counting its own.

Three twists

A split vote: S2 and S4 time out at almost the same moment, and each gets 2 votes, so nobody reaches 3. Both wait a new random timeout and try again in the next term. One of them usually starts first and wins. That's why the timeouts are random: if everyone timed out at the same moment, the votes would keep splitting.
The old leader comes back: S1 returns, or was only cut off from the network, and still thinks it's the leader of term 3. It sends heartbeats marked term 3, the others answer "we're in term 4", and S1 steps down to follower. While it was cut off, it couldn't reach a majority, so it couldn't commit any write or confirm one to a user. That's fencing with terms, from section 18, built into the protocol.
A candidate that's behind: S5 was offline and missed recent writes. If its timeout runs out and it asks for votes, the others refuse, because their logs are ahead of its log. So it can't win, which guarantees the leader always has every committed write.

Why it's safe

Majority votes plus one vote per term: two leaders can't win the same term, so there's no split brain.
Terms: an old leader is recognised and steps down.
The log check: a new leader always has every committed write, so nothing is lost.

The costs

No writes during an election. That's usually well under a second.
A minority can't elect a leader. If the network cuts off 2 of the 5 servers, those 2 can't gather 3 votes, so they stop accepting writes. That's the "consistent rather than available" choice from CAP.
The timeout trade-off from section 18: too short causes needless elections, and too long leaves the system without a leader for longer.

Used in: etcd (which Kubernetes uses), Consul and CockroachDB. ZooKeeper uses a similar protocol, called ZAB.

In an interview: "For leader election I'd use etcd or ZooKeeper, not build it myself. They run Raft or something like it: a leader needs a majority of votes, terms stop an old leader from acting, and the smaller side of a network split simply stops accepting writes."


30. Raft: writes (log replication)
Each log entry has a position (its index), the term it was created in, and the write itself.
The goal: every server ends up with the same log, in the same order, and applies the writes in that order, so all the copies end up identical.

A normal write

A client sends a write to the leader. The leader adds it to its log at the next index.
The leader sends it to every follower, together with the index and term of the entry just before it.
Each follower checks that its own log has that previous entry. If it does, the logs match up to there, so it saves the new entry on disk and replies OK.
Once a majority, counting the leader, has saved it, the entry is committed. The leader applies it and tells the client "done".
The leader's next message says how far it has committed, and the followers apply up to that point.

A follower that's behind, or different: the backfill

If a follower doesn't have the previous entry, it replies "no match". The leader tries again one entry earlier, sending the entries after that point too. It keeps stepping back until it finds the last point where the two logs agree.
From that point, the follower deletes anything that differs and copies the leader's entries.
The leader's log always wins. The entries a follower loses were never committed: an old leader wrote them but couldn't reach a majority. Committed entries are never lost, because every leader already has all of them, thanks to the election rule from section 29.
Only the missing part is sent, not the whole log.

Example: the leader's log is 1, 2, 3, 4, and it adds 5. A follower that was offline has only 1 and 2.

Leader: "Here's 5. Before it, you should have 4." Follower: "I don't have 4."
Leader: "Here are 4 and 5. Before them, you should have 3." Follower: "No."
Leader: "Here are 3, 4 and 5. Before them, you should have 2." Follower: "Yes, I have 2."
The follower adds 3, 4 and 5, and it's caught up.

Why it isn't two-phase commit (section 26)

2PC needs every participant to agree, and a crashed coordinator leaves everyone in doubt.
Raft needs only a majority. If the leader dies, a new leader that already has every committed write is elected and carries on, so nobody is left waiting.

Reads, an L5 detail: a leader that's been cut off may not know it was replaced. So for a read that must return the latest value, the leader first checks with a majority that it's still the leader, or the read goes through the log just like a write.

In an interview: "Raft keeps one ordered log on every server. A write is committed once a majority has stored it, and a follower that's behind is brought up to date from the last point where its log matches the leader's. That's the kind of guarantee etcd and ZooKeeper give you."

