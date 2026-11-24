
Lessons from mock 1: ticket booking

Design

Keep transactions short (sections 11 to 13). Never hold a lock while waiting for a person or an outside service such as payment. Split the purchase in three: hold the seats with an expiry in one short transaction, pay outside any transaction, then confirm in another short transaction.
No row, no lock (section 10). Double booking is the phantom problem. Create one row per seat per concert in advance, so there’s always a row to lock. A unique index on (concertId, seat) serves the “seats of a concert” query and is also a safety net against duplicates.
Choose locks or optimistic checks by contention (sections 12 and 13). When many users fight over the same rows, locks win, because waiting a few milliseconds beats redoing the work. Short transactions are what keep locks cheap.
Lock several rows in a fixed order (section 12), for example by seat number, so overlapping requests can’t deadlock.
A cache can’t join a database transaction (the “two places” point from the index lesson). The database is the truth, and the cache may lag a few seconds behind it. That’s safe as long as every booking checks the database again.
Stateless servers mean you can run many (section 1). A single server is a bottleneck and a single point of failure. The servers hold no data, so run several.

Interview

Design for the peak, not the average. Ask what the busiest moment looks like, and turn every number into a decision.
Walk through every feature end to end, including steps outside your system, such as payment. A missing step is a missing feature.
When asked to confirm, restate your answer, and always wrap up: recap, weak spots, next steps.
