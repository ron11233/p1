14. Column-oriented storage (Parquet)

Two kinds of work

Transactions (OLTP): the app reads and writes a few rows by key, such as “book seat 101”. Row storage fits this.
Analytics (OLAP): a query scans millions of rows but needs only a few columns, such as “average ticket price per city last year”. Analysts and data scientists run these, usually on a separate database called a data warehouse.

The problem: row storage keeps each row’s columns together on disk, so reading one column means reading every full row. With 100 columns, a query that uses 3 of them reads about 30 times more data than it needs.

The idea: store each column separately, with all values of column A together and all values of column B together. Every column keeps the rows in the same order, so the 5th value in each column belongs to row 5. A query reads only the columns it uses.

Compression

Values in one column are similar and repeat a lot, so columns compress very well.

Bitmap encoding: for a column with few distinct values, such as country, keep one bitmap per value. Each bitmap has one bit per row: 1 if the row has that value, 0 if not. For example, country = [IL, US, IL] gives IL: 101 and US: 010.
Filters become fast bit operations. “country = IL AND year = 2026” is an AND of two bitmaps.
Run-length encoding: long runs of the same bit are stored as counts, such as “0 × 9,000, then 1 × 50” instead of 9,050 bits.
Dictionary encoding: each distinct string is stored once in a dictionary, and the column holds a small number instead. For example, “Tel Aviv” becomes 3.
Why compress: there’s less to read from disk and less to send over the network, and more data fits in memory and in the CPU cache, so scans run faster.

Sort order

Rows can be stored sorted by a column that queries often filter on, such as date. A date range then reads one block that sits together, and the sorted column compresses extremely well with run-length encoding.
Whole rows move together: you sort rows, not each column on its own, or the columns would no longer line up.

Writes: the LSM tree part

The cost: column files are sorted and compressed, so you can’t insert a row in place. A single new row would mean rewriting every column file.
The fix is the LSM idea from section 5:
New rows go to an in-memory buffer first.
When the buffer fills, it’s sorted and written out in bulk as new column files.
Background merges combine the files, like compaction.
Queries read both the files on disk and the recent rows in memory.
So column stores take writes in large batches, not one row at a time.

Parquet

An open file format that stores a table column by column, compressed, in large files that are never edited, only added or replaced.
Each chunk of rows records the minimum and maximum of every column, so a query can skip chunks that can’t match, such as dates outside its range.
It’s used for analytics with tools like Spark, often as files in cloud storage, which is called a “data lake”.

When to use which

	Row storage	Column storage
Workload	Transactions: read and write a few full rows	Analytics: scan many rows, few columns
Writes	Fast, one row at a time	Slow one at a time, so done in batches
Reading one full row	Fast	Slow: one read per column
Examples	Postgres, MySQL	BigQuery, Redshift, Snowflake, ClickHouse; Parquet files

Trap: Cassandra and HBase are called “wide-column” databases, but they store data row by row. They are not column-oriented in this sense.

In an interview: “The app database stays row-oriented for transactions. For analytics, I’d copy the data regularly into a column store such as BigQuery, or into Parquet files, because those queries scan many rows but only a few columns, and columns compress well.”


15. Data serialization frameworks
Serialization (encoding): turning an object in memory into bytes, to send over the network or save to disk. Deserialization turns the bytes back into an object.

Text formats: JSON, XML, CSV

Pros: people can read them, every language supports them, and browsers speak JSON.
Cons:
Big: every record repeats every field name, such as "userName".
Slow to parse.
Loose types: there’s no clear difference between an integer and a float, and no schema to say which fields must exist.

Binary formats with a schema: Protocol Buffers (Google), Thrift (Facebook), Avro

You write a schema once, giving each field a name, a type and a number called its tag. For example: string user_name = 1;.
A tool generates the classes for each programming language from the schema.
The bytes contain the tag number instead of the field name, and numbers are stored compactly. A record that takes about 80 bytes as JSON takes about 33 with Protocol Buffers.
Pros: smaller and faster, typed, and the schema documents the data.
Cons: people can’t read the bytes without the schema and a tool.

Schema evolution: why they matter most

Services are updated one machine at a time (a rolling upgrade), so old and new versions run side by side and must understand each other’s data.
Backward compatible: new code reads data written by old code.
Forward compatible: old code reads data written by new code.
The rules, using Protocol Buffers as the example:
Never change or reuse a field’s tag number.
Give new fields new tags. Old code skips tags it doesn’t know, so it keeps working.
New fields must be optional or have a default, so new code can read old data that lacks them.
Only remove optional fields.
Avro has no tag numbers. The reader compares the writer’s schema with its own and matches fields by name, so the writer’s schema has to travel with the data, for example in the file’s header.

Where they’re used

Between your own services: gRPC, which sends Protocol Buffers.
In message queues and big data files: Avro is common with Kafka and Hadoop.
Public APIs and browsers: these usually stay on JSON.

In an interview: “The public API is JSON over HTTP. Between internal services I’d use gRPC with Protocol Buffers: messages are smaller and faster to parse, and the schema can change safely while old and new versions run side by side.”


