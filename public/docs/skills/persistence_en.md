# Skill Descriptions: Java Persistence

This document covers Java Persistence API (JPA), Hibernate, JDBC, and the various strategies for managing data lifecycles and transactions in Java applications.

---

## 1. EAGER vs LAZY Fetching
**Description**
Fetching strategies in JPA define when related entities should be loaded from the database. EAGER fetching loads everything immediately, which is convenient but can lead to performance issues if large graphs of unnecessary data are retrieved.

LAZY fetching is the preferred default; it loads related entities only when they are first accessed. This keeps the initial query fast and lightweight. Professional developers must understand these defaults (e.g., @OneToMany is LAZY, @ManyToOne is EAGER) to prevent unintended performance bottlenecks.

A common pitfall is the "N+1 selects" problem, where a single query for a list of entities triggers N additional queries for their LAZY relations. Strategies like "JOIN FETCH" or using EntityGraphs are essential for optimizing these scenarios and ensuring efficient data retrieval.

**Key Points**
*   Controls data loading timing to balance initial query speed with overall system memory usage, using specialized fetching strategies to avoid common performance pitfalls like N+1 queries.

---

## 2. EntityManager and @Transactional
**Description**
The EntityManager is the heart of JPA, acting as the interface between the application and the persistence context. It manages the lifecycle of entities, allowing developers to persist, find, merge, and remove data through a standardized API.

The @Transactional annotation simplifies database management by defining the boundaries of a transaction. It ensures that operations are atomic; if a method succeeds, the changes are committed, but if an error occurs, the entire set of changes is rolled back to maintain data consistency.

Understanding transaction propagation (like REQUIRED vs REQUIRES_NEW) is critical for managing complex business flows. Improper use of these annotations, especially on private methods or within the same class, can lead to transactions being ignored, causing quiet data corruption.

**Key Points**
*   Manages the entity lifecycle and transactional consistency, ensuring atomic operations and reliable state transitions within the database.

---

## 3. JDBC Fundamentals (PreparedStatement, ResultSet)
**Description**
JDBC (Java Database Connectivity) is the low-level API that JPA build upon. While ORMs like Hibernate are more common, understanding JDBC remains vital for high-performance scenarios or when using legacy systems where direct SQL control is required.

PreparedStatement is the gold standard for executing SQL. It not only improves performance through pre-compilation but also provides the primary defense against SQL Injection attacks by safely handling input parameters.

Handling a ResultSet requires careful management of the database cursor and resources. Modern developers use "try-with-resources" to ensure that connections, statements, and result sets are always closed correctly, preventing memory leaks and connection pool exhaustion.

**Key Points**
*   Provides low-level, high-performance database access with a focus on security through prepared statements and rigorous resource management.

---

## 4. JPA Caching (L1 and L2)
**Description**
JPA uses caching to reduce the number of direct database hits. The L1 (First Level) Cache is mandatory and tied to the EntityManager session, ensuring that the same entity requested twice in the same transaction returns the same instance.

The L2 (Second Level) Cache is optional and shared across all sessions in the application. It requires an external provider like Ehcache or Redis. L2 cache is powerful for read-heavy applications but introduces risks of "stale" data if the database is modified externally.

Query caching is a specialized form of L2 cache that stores the results of specific JPQL queries. Effectively managing these layers—including expiration policies and eviction strategies—is the key to building lightning-fast, scalable Java services.

**Key Points**
*   Improves application performance by minimizing database round-trips through a multi-layered caching architecture that balances data speed with consistency.

---

## 5. Locking and Transactions
**Description**
Concurrency control ensures that multiple users can access the same data without corrupting it. Optimistic Locking (using @Version) assumes conflicts are rare, checking for changes only at commit time, which is highly scalable for most web apps.

Pessimistic Locking is more defensive, locking the database row as soon as it is read. This prevents others from even reading the data until the transaction is complete. While safer for highly contested data, it can significantly reduce system throughput and cause deadlocks.

Developers must also understand database isolation levels (like READ_COMMITTED vs REPEATABLE_READ) and their impact on performance. Choosing the right locking strategy is a delicate balance between data integrity and system responsiveness.

**Key Points**
*   Protects data integrity in concurrent environments by managing access conflicts through optimistic or pessimistic locking strategies and transaction isolation.

---

## 6. Query Builders and Projections
**Description**
Beyond basic JPQL, developers use tools like QueryDSL, Criteria API, or jOOQ to build dynamic and type-safe queries. These builders prevent syntax errors in strings and make complex filtering much easier to maintain and test.

Specifications and Predicates allow for reusable pieces of query logic that can be combined on the fly. This "functional" approach to querying is excellent for search pages where users can filter by many different, optional criteria.

Projections are equally important; they allow fetching only subsets of data into DTOs instead of full entities. This reduces the amount of data transferred from the database and the memory consumed by the application, which is vital for high-performance reporting.

**Key Points**
*   Enables the creation of dynamic, type-safe queries and optimized data transfer through standardized builders and selective data projection.

---

## 7. Entity Relationships (@ManyToMany, etc.)
**Description**
Mapping real-world relationships to a database schema is a core skill. JPA provides annotations like @OneToMany, @ManyToOne, and @ManyToMany to handle these connections, along with "mappedBy" to define which side owns the relationship.

Advanced mapping includes inheritance strategies (SINGLE_TABLE vs JOINED). SINGLE_TABLE is fast but can lead to many null columns, while JOINED is more normalized but requires complex JOINS. The choice depends on the specific query patterns and data volume.

Orphan removal and cascading are powerful features that automate the deletion of related records. However, they must be used with extreme caution to avoid accidentally deleting large amounts of data. Proper relationship design is the foundation of a clean and efficient domain model.

**Key Points**
*   Models complex business domains into relational schemas using standardized mapping annotations and inheritance strategies to ensure data consistency and ease of navigation.
