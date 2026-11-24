System design notes
1. Hardware: RAM vs disk
	RAM	Disk
Speed	Very fast; any address in about 100 ns	Slow when jumping around (HDD about 10 ms per jump, SSD about 0.1 ms); fast when reading in a row
Durable?	No, lost on shutdown	Yes
Cost	Expensive, so there is less of it	Cheap, so there is a lot of it
	•	Data we need to keep goes on disk.
2. Why a database
* With several app servers, data saved on one server is invisible to the others.
* So the data lives in one shared layer, the database, that all servers read and write.
* The servers then hold no data of their own (stateless), so any server can handle any request and we can add more of them.
3. Database index
* Problem: without an index, finding a row means scanning the whole table, which is O(n).
* What it is: a separate structure that maps a column’s value to where the row is.
* Benefit: fast reads for a commonly used query: O(1) with a hash index, O(log n) with a B-tree.
* Cost: slower writes (every write also updates the index) and extra storage.
4. Hash index
* A hash map from key to row location. Example: key "ron" points to row 3. Lookup is O(1).
* Cons:
    * Bad on disk. Hashing spreads keys evenly, so entries are far apart, and jumping around on disk is slow. That is why hash indexes are kept in RAM.
    * Limited by RAM. All entries must fit in memory: number of rows × (key + pointer).
    * Not durable, because it lives in RAM. The fix is to also append writes to a log on disk (write-ahead log) and rebuild the index after a restart.
    * No range queries. The keys aren’t sorted.
* Multiple columns in one index: each entry is bigger (more RAM), and a lookup must supply all of the columns.

5. B-tree
* A sorted tree stored on disk. Each node is one page (4 to 16 KB). Upper nodes are signposts, and the leaves hold the keys.
* Needs a sortable key: numbers, dates, strings, or several columns compared in order.
* Insert: walk down to the right leaf and insert in sorted position. If the leaf is full, split it in two and push the middle key up to the parent. The tree gets taller only when the root splits, so all leaves stay at the same depth.
* Pros:
    * Lives on disk, so it handles massive data and isn’t limited by RAM.
    * Range queries (all children aged 10 to 20), because sorted keys sit next to each other.
    * Reads and writes are O(log n).
* Durability: a write-ahead log (WAL). Write the change to the log first, then to the tree, and replay the log after a restart. This protects against a crash in the middle of a write.
* Cons:
    * Slower lookups than an in-memory hash index: O(log n) with disk reads, against O(1) in RAM.
    * Slower writes than an LSM tree: each write rewrites a page in place, at a scattered location on disk.
* Multiple columns: sorted by the first column, then the second, so a lookup by the first column alone still works.


LSM Trees

1. Names. The in-memory tree is the memtable (a balanced tree, which is what makes it O(log n)). A delete is written as a marker called a tombstone.
2. Durability. The memtable is in RAM, so every write is also appended to a write-ahead log on disk.
3. Why writes are fast. Memory is only half of it. Everything that reaches the disk is written in a row (log appends, whole SSTable files) and never in place.
4. Bloom filters. This is the standard fix for the slow reads you described.
5. Range queries still work, because the memtable and the SSTables are all sorted.
6. LSM tree
* Idea: never update data in place on disk. Write to memory first, then flush to disk as sorted files that are never changed.
* Write path:
    1. The write goes into the memtable, a balanced sorted tree in RAM. This is O(log n).
    2. It is also appended to a write-ahead log on disk, so the memtable can be rebuilt after a crash.
    3. When the memtable is full, it is flushed to disk as an SSTable, a sorted, immutable file. An in-order walk of the tree gives the keys already sorted, so the flush is O(n) with no sorting.
* Why writes are fast: they use memory plus in-a-row disk writes only, with no scattered page rewrites as in a B-tree.
* Read path: check the memtable, then the SSTables from newest to oldest, and stop at the first hit. Each check is O(log n) because the file is sorted, but there can be many files, so reads are slower than in a B-tree.
    * Bloom filter: a small in-memory structure per SSTable that can say "this key is definitely not in this file", so most files are skipped without touching the disk.
    * Sparse index: keeps some keys and their file positions in memory, so a search jumps close to the key instead of scanning the file.
* Updates and deletes: SSTables are immutable, so an update is a new entry with the new value, and a delete is a new entry with a tombstone. The newest entry for a key wins.
* Compaction: old versions pile up and storage grows, so a background process merges SSTables, keeps only the newest entry per key, and drops deleted ones. It costs CPU and disk work while it runs.
* Pros: very fast writes; not limited by RAM, because the data lives on disk; range queries work, because everything is sorted.
* Cons: slower reads; compaction uses resources in the background; extra storage until compaction runs.
* Used in: Cassandra, RocksDB, HBase. Choose it for write-heavy workloads such as logs, metrics and chat messages.
B-tree vs LSM tree
	B-tree	LSM tree
Writes	Slower: rewrites a page in place, scattered on disk	Faster: memory plus in-a-row appends
Reads	Faster: one tree to walk	Slower: memtable plus several SSTables
Choose when	Read-heavy	Write-heavy


	Hash index	B-tree	LSM tree
Lives in	RAM	Disk	RAM (memtable) and disk (SSTables)
Reads	Fastest, O(1)	Fast, O(log n)	Slower: several places to check
Writes	Fast	Slower: rewrites pages in place	Fast: memory plus in-a-row appends
Range queries	No	Yes	Yes
Main weakness	Keys must fit in RAM	Write speed	Read speed, compaction
 
