# Skill Descriptions: Java Group

This document provides a detailed overview of the core technical skills required for the Java group in the Perficient assessment application. Each skill includes a descriptive overview and key points for quick reference.

---

## 1. Types and Wrappers
**Description**
Java distinguishes between primitive types (like `int`, `double`) and their corresponding Wrapper classes (like `Integer`, `Double`). Primitives are efficient as they store values directly on the stack, whereas Wrappers are objects stored on the heap, allowing them to be `null` and used in generic collections.

Understanding the difference is crucial for memory management and performance, especially in high-load loops where boxing/unboxing can create overhead. Modern Java versions handle the conversion between them automatically through Autoboxing and Unboxing.

The `Integer` class includes a cache (typically from -128 to 127) to optimize memory by reusing common objects. Using `valueOf()` instead of `new` ensures that the cache is utilized properly.

**Key Points**
*   Primitives are value-based and not-null; Wrappers are objects, support null, and are required for use in Java Collections.

---

## 2. Pattern Matching
**Description**
Pattern Matching in Java simplifies code by combining type checking and variable extraction into a single step. Originally introduced for `instanceof`, it eliminates the need for explicit and error-prone casting after a successful type check.

This feature has evolved to support `switch` expressions, allowing developers to match against types directly and apply additional filters using the `when` clause. This results in more readable and declarative control flow.

Advanced uses include Record Patterns, which allow for the deconstruction of data-carrying records directly within the matching logic. This facilitates a more functional style of programming.

**Key Points**
*   Simplifies type checking and extraction by removing manual casts and enabling exhaustive logic in switch expressions.

---

## 3. Try catch closing resources
**Description**
Resource management is handled safely using the Try-with-resources (TWR) statement. This syntax ensures that objects implementing the `AutoCloseable` interface (like file streams or database connections) are closed automatically at the end of the block.

TWR is superior to the traditional `finally` block because it is cleaner and correctly handles "suppressed exceptions" that might occur during the closing process without masking the primary exception.

When multiple resources are declared in a single TWR statement, they are closed in the reverse order of their declaration, ensuring secondary resources are closed before their dependencies.

**Key Points**
*   Guarantees automatic and orderly closing of resources, preventing leaks and improving exception transparency.

---

## 4. Typescript | Objects, Classes and Interfaces
**Description**
Although primarily a Java-focused group, understanding TypeScript's object-oriented features is essential for full-stack developers. TypeScript provides `Interface` and `Type` to define the shape of objects, with interfaces supporting "declaration merging" for extendability.

Classes in TypeScript support standard modifiers like `public`, `private`, and `protected`, which control access during development. These features help enforce architectural boundaries similar to Java's encapsulation.

Advanced concepts like Discriminated Unions and Mapped Types allow for powerful type transformations and safer data handling by leveraging literal types as unique identifiers.

**Key Points**
*   Enforces structure and safety in web development through rigorous type definitions and object-oriented principles.

---

## 5. null and optional
**Description**
The `Optional<T>` class was introduced to provide a more expressive way of handling values that might be absent, reducing the frequency of `NullPointerException`. It forces developers to explicitly handle the "empty" case.

Methods like `ofNullable()` allow for safe creation from potentially null values, while `orElseGet()` provides a lazy way to handle defaults. Proper usage involves avoiding `Optional` in fields or parameters to minimize memory overhead.

In high-performance scenarios or data-heavy streams, traditional null checks may be preferred due to the object allocation overhead caused by wrapping every value in an `Optional`.

**Key Points**
*   Promotes explicit handling of absent values via a container-based API, though it should be used judiciously to avoid performance bottlenecks.

---

## 6. Java Time
**Description**
The `java.time` API (JSR-310) provides a comprehensive and thread-safe framework for date and time manipulation. Unlike the legacy `Date` and `Calendar` classes, the new API is immutable and thread-safe.

The API separates "human time" (e.g., `LocalDate`, `LocalDateTime`) from "machine time" (`Instant`). It also includes robust support for time zones via `ZonedDateTime` and `OffsetDateTime`.

Handling differences in time is made easy with `Period` for human-scale units like days/months and `Duration` for high-precision units like seconds/nanoseconds.

**Key Points**
*   Provides a modern, immutable, and thread-safe solution for managing complex temporal logic and time zone conversions.

---

## 7. Keywords and syntaxis
**Description**
Java's syntax is built on a specific set of keywords that define behavior and visibility. Keywords like `transient` prevent field serialization, while `volatile` ensures memory visibility across different threads by bypassing local caches.

Modifiers such as `final` are used to create constants or prevent inheritance, whereas `synchronized` provides basic thread synchronization by locking on an object's monitor.

Modern additions like `default` methods in interfaces allow for evolving APIs without breaking existing implementations, supporting better retrocompatibility in large-scale libraries.

**Key Points**
*   Defines the core rules of the language, governing everything from memory visibility to architectural constraints and API evolution.

---

## 8. Threads
**Description**
Java provides powerful multi-threading capabilities, allowing applications to perform concurrent tasks. Threads can be managed directly via the `Thread` class or more efficiently through the `Executor` framework.

Concurrency introduces risks like Race Conditions, where threads clash over shared data, and Deadlocks, where threads wait indefinitely for each other. Proper synchronization is key to preventing these.

Java 21 introduced Virtual Threads, which are lightweight and managed by the JVM. These allow for massive scalability by supporting millions of concurrent tasks with minimal overhead compared to OS threads.

**Key Points**
*   Enables parallel execution and scalability, evolving from manual thread management to sophisticated, lightweight concurrency models.

---

## 9. Functions and Lambdas
**Description**
Functional programming in Java is centered around Functional Interfaces—interfaces with a single abstract method. Lambda expressions provide a concise way to implement these interfaces as anonymous functions.

Lambdas facilitate the internal iteration of collections and are the foundation of the Streams API. They can capture variables from their surrounding scope, provided those variables are "effectively final."

Method references (`::`) further simplify the syntax by allowing existing methods to be passed directly as functional implementations, enhancing code readability and maintainability.

**Key Points**
*   Introduces functional paradigms to Java, enabling cleaner, more expressive code through concise anonymous functions and method references.

---

## 10. Records
**Description**
Records are a special type of class in Java designed primarily to act as transparent data carriers. They automatically generate boilerplate code like constructors, accessors, `equals()`, `hashCode()`, and `toString()`.

By being implicitly final and having immutable components, records promote safer data handling and are ideal for DTOs (Data Transfer Objects) and simple data structures.

While records are shallowly immutable, they can still hold mutable collections. They support compact constructors for data validation before the state is finalized.

**Key Points**
*   Reduces boilerplate and emphasizes immutability for data-centric classes, making them ideal for modern architectural patterns.

---

## 11. Generics
**Description**
Generics provide compile-time type safety by allowing classes, interfaces, and methods to be parameterized with types. This prevents `ClassCastException` and reduces the need for explicit casting.

The concept of Type Erasure means that generic type information is removed during compilation to ensure backward compatibility with older Java versions. This leads to certain limitations, such as the inability to create arrays of generic types.

Bounded Wildcards (`extends` and `super`) offer flexibility in how generic types can be used, supporting covariance (reading) and contravariance (writing) respectively.

**Key Points**
*   Ensures type integrity during development while maintaining compatibility via type erasure and flexible wildcard constraints.

---

## 12. API Concurrent
**Description**
The `java.util.concurrent` package offers high-level utilities for building multi-threaded applications. The `ExecutorService` simplifies task execution by managing thread pools and lifecycle.

Future-based concurrency has evolved from the blocking `Future` interface to the more flexible and functional `CompletableFuture`, which allows for non-blocking task chaining and composite actions.

Advanced synchronization primitives like `ReentrantLock` and atomic variables (e.g., `AtomicInteger`) provide finer-grained control than the standard `synchronized` keyword, optimizing performance in competitive environments.

**Key Points**
*   Provides robust tools and abstractions for managing complex asynchronous workflows and high-performance concurrent data structures.

---

## 13. Exceptions
**Description**
Java uses a structured hierarchy for error handling, rooted in the `Throwable` class. It distinguishes between Checked Exceptions (must be handled) and Unchecked Exceptions (runtime errors).

Proper exception handling involves capturing specific exceptions rather than broad types like `Throwable` or `Error`, which should generally be left to the JVM to handle in case of fatal failures.

Exception chaining allows developers to wrap a low-level error into a high-level exception while preserving the original cause, which is essential for effective debugging and logging.

**Key Points**
*   Orchestrates error management through a rigorous hierarchy, emphasizing clear reporting and preservation of failure contexts.

---

## 14. Overriding
**Description**
Method Overriding allows a subclass to provide a specific implementation of a method that is already defined in its superclass. This is a fundamental pillar of runtime polymorphism.

The `@Override` annotation is highly recommended as it signals the compiler to verify the method signature, preventing subtle bugs caused by typos or mismatched parameters.

Rules for overriding include maintaining or increasing the visibility of the method and ensuring that the return type is compatible (covariant return types are allowed).

**Key Points**
*   Enables dynamic behavior by allowing subclasses to redefine inherited methods, supporting the Open/Closed principle of software design.

---

## 15. Java 17 Features
**Description**
Java 17, a Long-Term Support (LTS) version, introduced significant enhancements like Sealed Classes. These allow a class or interface to restrict which other classes may extend or implement them.

Other impactful features include Helpful NullPointerExceptions, which provide more detailed messages about which specific variable was null, and the finalization of Text Blocks for easier multi-line string handling.

This version also continued the trend of pruning obsolete APIs and strengthening the JDK's internal encapsulation, pushing developers toward more secure and sustainable coding practices.

**Key Points**
*   Strengthens architectural control through Sealed Classes and improves developer productivity with better diagnostic tools and cleaner string syntax.

---

## 16. Java 21 Features
**Description**
Java 21 is a landmark LTS release that introduced Virtual Threads (Project Loom). These lightweight threads revolutionize scalability by allowing applications to handle millions of tasks effortlessly.

The release also finalized Record Patterns for pattern matching and introduced Sequenced Collections, which provide a unified API for accessing elements in ordered collections like `List` or `LinkedHashSet`.

Structured Concurrency, though in preview, aims to make multi-threaded programming more maintainable by treating groups of related tasks as a single unit, simplifying error propagation.

**Key Points**
*   Revolutionizes concurrency with Virtual Threads and refines data manipulation with Record Patterns and Sequenced Collections.

---

## 17. Java 25 & Future Features
**Description**
Looking toward Java 25 and beyond, the language continues to evolve with features like String Templates (Project Amber) for safer and more readable string interpolation without the risks of manual concatenation.

Project Panama is bringing the Foreign Function & Memory API, providing a safer and more performant alternative to JNI for interacting with non-Java libraries (like those written in C).

Project Leyden is focusing on improving the startup time and memory footprint of Java applications, addressing one of the traditional weaknesses of the platform in serverless and containerized environments.

**Key Points**
*   Continues to modernize the platform by improving startup performance, easing external integration, and enhancing string safety.
