
Mock 2: URL shortener, key takeaways

Requirements

"Worldwide" is a cue to ask about regions, latency, availability, traffic spikes, and how fast new data must be visible.
If links have owners and can be updated, long URLs aren't unique.

Numbers

2^10 ≈ 1,000. One character out of 62 is about 6 bits.
5 characters give about 1 billion codes, and each extra character multiplies that by about 60, so use 7.
Use average sizes for totals: about 500 bytes a row gives 3 TB.
A billion bytes is 1 GB, and a trillion is 1 TB.

API and data

POST to create, PATCH to update, and the redirect is GET /{code} → 302.
User identity comes from the login token, and updates check the owner.
The code is the primary key, which gives uniqueness plus a B-tree for the lookup.
Use Postgres while one leader fits. Use a key-value store when every access is by key and you outgrow one machine. Per lookup, both are about equally fast; the difference is how they scale.

Codes

Hash: when the same URL should give the same code and links never change.
Random: when links have owners, can be updated, or must be private.
Counter: zero collisions, but guessable.
Don't check, then insert. Insert, let the primary key reject a duplicate, and retry.

Replication

One leader stops conflicts between copies, not races between transactions.
New links can be missing in other regions, so on "not found", ask the leader.
Split brain is solved by fencing with term numbers.
Durability needs copies on other machines, not just a disk.

Caching (details with the cache videos)

A cache in each region, filled on read (cache-aside), with LRU plus a TTL.
An update deletes the cache entries, and redirects use 302, not 301.

Habits

Deep-dive the core of the question first.
Skip non-problems.
Always wrap up.

I'll bring back part 2 of the cache lesson when you reach the caching videos.
