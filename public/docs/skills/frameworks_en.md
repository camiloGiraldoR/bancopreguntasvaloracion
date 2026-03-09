# Skill Descriptions: Java Frameworks

This document covers the core concepts of the Spring Framework, including its IoC container, bean management, and the stereotyping annotations used in modern enterprise applications.

---

## 1. Spring Framework Core
**Description**
Spring is the industry-standard framework for building enterprise Java applications. Its core philosophy is based on "Inversion of Control" (IoC), which shifts the responsibility of object creation and lifecycle management from the developer to the Spring Container.

The most common implementation of IoC in Spring is Dependency Injection (DI). Instead of a class creating its own dependencies, Spring "injects" them at runtime. This leads to code that is highly decoupled, much easier to test with mocks, and very flexible to changes.

Beyond DI, the Spring Container (ApplicationContext) provides advanced features like event handling, internationalization, and robust resource management. It serves as the unified backbone for a wide ecosystem of modules (Security, Data, Boot) that simplify every aspect of development.

**Key Points**
*   Provides a comprehensive infrastructure for Java applications through Inversion of Control and Dependency Injection, enabling modular, testable, and maintainable software.

---

## 2. Bean Lifecycle and Scopes
**Description**
In Spring, an object managed by the container is called a "Bean." Understanding the bean lifecycle—from instantiation and dependency injection to initialization and destruction—is crucial for managing resources like database connections or network sockets.

Spring defines different "Scopes" for these beans. The default is "Singleton," where a single instance is shared across the entire application. "Prototype" creates a new instance every time the bean is requested, which is useful for stateful objects that shouldn't be shared.

Web-aware applications add even more scopes, such as "Request," "Session," and "Application," which tie a bean's lifecycle to specific HTTP contexts. Properly choosing the scope is essential for ensuring thread safety and efficient memory usage in high-traffic systems.

**Key Points**
*   Manages the creation, visibility, and destruction of application components through structured lifecycles and configurable visibility scopes.

---

## 3. Spring Annotations (@Component, @Service, @Repository)
**Description**
Spring uses stereotyping annotations to categorize and automatically register beans. @Component is the generic stereotype, while specialized ones like @Service (for business logic) and @Repository (for data access) provide semantic meaning and specialized features.

For example, @Repository not only registers the bean but also enables automatic translation of vendor-specific database exceptions into Spring's unified DataAccessException hierarchy. This allows the application to handle errors consistently regardless of the underlying database.

@RestController is a specialized version of @Controller that combines it with @ResponseBody, automatically serializing return values into JSON or XML. These annotations, used alongside @Autowired for injection, form the basis of the declarative programming style that makes Spring so powerful.

**Key Points**
*   Simplifies application configuration and discovery through semantic stereotypes that enable specialized framework behaviors like exception translation and automatic serialization.

---

## 4. Inversion of Control (IoC) Strategies
**Description**
While DI is the most used IoC strategy, Spring offers multiple ways to perform it. Constructor injection is the most recommended approach, as it ensures dependencies are mandatory, the object is always in a valid state after creation, and it facilitates immutability.

Field injection (using @Autowired directly on the attribute) is common but discouraged for production code because it makes testing harder and hides the number of dependencies a class has. Setter injection is a middle ground, useful for optional dependencies that can change at runtime.

Advanced IoC also includes "Aspect-Oriented Programming" (AOP). AOP allows developers to separate cross-cutting concerns—like logging, security, or transactions—into separate "Aspects" that are automatically woven into the application's execution flow without cluttering business logic.

**Key Points**
*   Decouples business logic from resource management through diverse injection strategies and aspect-oriented programming, enhancing code clarity and separation of concerns.
