# Skill Descriptions: Database

This document provides detailed explanations of key database skills including persistence frameworks, SQL optimization, query building, and database design patterns.

---

## EAGER vs LAZY Fetching

**Description**
FetchType.EAGER loads related entities immediately when the parent is loaded. FetchType.LAZY defers loading until the relationship is explicitly accessed, reducing memory consumption and initial query overhead.

The N+1 query problem occurs when loading a list of entities (1 query) triggers additional queries for each lazy relationship (N queries). Strategies like JOIN FETCH and EntityGraph are essential for avoiding this performance bottleneck.


**Key Points:**
- Controls data loading timing to balance query performance with memory usage and avoid common N+1 pitfalls.

---

## EntityManager and @Transactional

**Description**
The EntityManager is the core interface for JPA operations—persisting, finding, merging, and removing entities. The @Transactional annotation defines transaction boundaries, ensuring atomic operations and automatic rollback on errors.

Understanding transaction propagation (REQUIRED vs REQUIRES_NEW) is critical. Misuse—especially on private methods or within the same class—can silently bypass transaction management, causing data corruption.


**Key Points:**
- Manages the entity lifecycle and ensures transactional consistency through atomic database operations.

---

## JDBC Fundamentals (PreparedStatement, ResultSet)

**Description**
JDBC is the low-level database access API underlying JPA. PreparedStatement is superior to Statement for both security (SQL Injection prevention) and performance (query plan caching).

ResultSet requires careful cursor and resource management. Modern code uses try-with-resources to guarantee that connections, statements, and result sets are always closed, preventing leaks and connection pool exhaustion.


**Key Points:**
- Provides secure, high-performance database access with rigorous resource management through prepared statements.

---

## JPA Caching (L1 and L2)

**Description**
L1 (First Level) Cache is mandatory and tied to each EntityManager session. L2 (Second Level) Cache is optional and shared across sessions, requiring external providers like Ehcache or Redis.

Query caching stores JPQL/SQL results. Effective cache management—including expiration policies and eviction strategies—is vital for building scalable Java services. Be aware of data staleness risks if external processes modify the database.


**Key Points:**
- Minimizes database round-trips through multi-layered caching while balancing data speed with consistency.

---

## Locking and Transactions

**Description**
Optimistic Locking uses @Version to detect concurrent modifications only at commit time—highly scalable for web applications. Pessimistic Locking blocks rows immediately, preventing other access until the transaction completes, safer but slower and prone to deadlocks.

Database isolation levels (READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE) control concurrency behavior. Choosing the right locking strategy and isolation level is a delicate balance between data integrity and system responsiveness.


**Key Points:**
- Protects data integrity in concurrent environments through optimistic or pessimistic strategies and isolation level management.

---

## JDBC Query Builders (jOOQ, MyBatis)

**Description**
MyBatis lets you map SQL directly to Java objects, providing control over query execution. jOOQ is a type-safe SQL DSL that generates code from your database schema, preventing syntax errors at compile time.

These tools enable dynamic, composable query construction—ideal for complex filtering, reports, and database-specific optimizations that JPA's abstraction cannot express.


**Key Points:**
- Enables dynamic, type-safe query construction with full control over SQL generation and database-specific features.

---

## Native Query vs JPQL

**Description**
JPQL operates on entities and attributes, providing database portability. Native Queries use raw SQL for database-specific features (window functions, Oracle hints) at the cost of portability.

Native Queries bypass JPA validation and require explicit result mapping. JPQL is recommended for standard CRUD operations; reserve native queries for performance-critical scenarios where portability isn't required.


**Key Points:**
- Balances database portability (JPQL) against power and performance (native SQL) based on application requirements.

---

## JPA Entity Relationships (@ManyToMany, @ManyToOne, @OneToMany)

**Description**
Mapping business relationships: @ManyToOne (many orders to one customer), @OneToMany (one customer to many orders), @ManyToMany (many students to many courses via a junction table).

Define ownership with "mappedBy" to avoid redundant metadata. Advanced strategies include inheritance (SINGLE_TABLE vs JOINED) and orphan removal for automatic cleanup. Bidirectional relationships increase complexity; use them only when necessary.


**Key Points:**
- Models complex business domains into relational schemas using standardized mapping while maintaining data consistency.

---

## JPA Query Builders (QueryDSL, Criteria Query, Specification)

**Description**
Criteria API and QueryDSL build dynamic queries programmatically, detecting syntax errors at compile time. QueryDSL's generated Q-Classes provide superior IDE support and readability.

Spring Data Specifications allow composable, reusable filter predicates combined with where(), and(), and or(). This functional approach is ideal for search pages with many optional filter criteria.


**Key Points:**
- Creates dynamic, type-safe queries that reduce runtime errors and facilitate maintenance of complex query logic.

---

## Query Optimization and Indexes

**Description**
Indexes are specialized data structures that accelerate data lookups—B-Tree indexes for range queries and sorting, Hash indexes for exact equality checks only.

Use EXPLAIN to visualize query execution plans. Covering Indexes (containing all columns for a query) allow the optimizer to fetch data directly from the index without accessing the table. Index fragmentation (from inserts/deletes) degrades performance; REINDEX or rebuild restores it.


**Key Points:**
- Optimizes data retrieval through strategic indexing and execution plan analysis, balancing fast reads against write performance.

---

## SQL Queries (SELECT, FROM, JOIN, GROUP BY, etc.)

**Description**
WHERE filters rows before grouping; HAVING filters groups after aggregation. INNER JOIN returns only matching rows; LEFT JOIN includes unmatched rows from the left table as NULLs.

Window Functions (OVER, ROW_NUMBER) compute values across related rows without grouping. Common Table Expressions (CTEs) define reusable result sets; recursive CTEs traverse hierarchical data like organizational trees.


**Key Points:**
- Builds efficient data retrieval queries using joins, aggregations, and window functions for complex analytical needs.

---

## PL/SQL

**Description**
PL/SQL (Oracle's procedural extension) enables stored procedures, functions, and packages with variables, conditionals, loops, and exception handling inside the database.

BULK operations (FORALL, BULK COLLECT) process multiple rows in a single context switch between PL/SQL and SQL, dramatically improving performance over row-by-row processing. Packages provide encapsulation, modularity, and state caching.


**Key Points:**
- Implements server-side business logic with procedural capabilities, improving performance and reducing network round-trips.

---

## Normalization and Constraints

**Description**
Primary Keys uniquely identify rows. Foreign Keys enforce referential integrity—preventing deletion of referenced parent rows. Normalization reduces redundancy; Third Normal Form (3NF) is the standard for transactional systems.

Denormalization (controlled duplication) is acceptable in analytics-focused systems (Data Warehouses) where read speed trumps write performance. Check Constraints provide the final, most secure line of defense against invalid data at the database layer.


**Key Points:**
- Ensures data integrity and reduces redundancy through structured design and rigorous constraint enforcement.

---

## Database Design

**Description**
Entity-Relationship (ER) diagrams visualize business entities and relationships before physical implementation. Many-to-Many relationships use junction tables. Composite Keys (multiple columns) ensure uniqueness when single columns aren't sufficient.

Logical Design is technology-agnostic; Physical Design adapts it to a specific database (Oracle, PostgreSQL) with concrete types and indexes. Multi-tenant SaaS systems choose between database-per-tenant (isolation), schema-per-tenant, or shared table with TenantID (maximum scalability).


**Key Points:**
- Creates scalable, consistent schemas that balance business requirements against database capabilities and distribution constraints.

---

## Clusters, Federation, and Datamarts

**Description**
A Database Cluster groups servers for high availability and scalability. High Availability (HA) ensures uptime despite hardware failures. Data Warehouse integrates enterprise-wide data; Data Mart subsets it by domain (Sales, Marketing).

Database Federation allows querying multiple heterogeneous sources (MySQL, Oracle, CSV) as one logical database. Replication synchronizes data: synchronous replication is safer but slower; asynchronous replication is faster but risks data loss on failure. Sharding partitions data horizontally across servers to handle massive volumes.


**Key Points:**
- Enables high availability, scalability, and data federation through clustering and distribution strategies.

---

## DDL (Data Definition Language)

**Description**
DDL statements (CREATE, ALTER, INSERT, UPDATE, DELETE, TRUNCATE) define and modify database structure. DELETE is DML (removes rows individually, allows WHERE, generates logs). TRUNCATE is DDL (empties table instantly, no WHERE, resets identity counters).

Executing ALTER TABLE on millions of rows risks long Exclusive Locks causing application downtime. SELECT * is discouraged in production (unnecessary columns, broken indexes, brittleness to schema changes). Materialized Views store query results physically on disk for instant complex query response times with scheduled refreshes.


**Key Points:**
- Provides foundational DDL operations for schema creation and data manipulation, with critical performance and locking implications.

---
