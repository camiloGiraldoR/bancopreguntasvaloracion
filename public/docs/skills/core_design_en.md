# Skill Descriptions: Core Design Principles

This document covers the essential design principles and patterns that ensure software is maintainable, scalable, and robust.

---

## 1. DRY (Don't Repeat Yourself)
**Description**
The DRY principle states that every piece of knowledge must have a single, unambiguous, and authoritative representation within a system. Duplication in code or logic leads to maintenance nightmares, as a change in one place requires manual and error-prone updates in all other duplicated spots.

Avoiding repetition doesn't mean you should never have similar-looking code. It's about avoiding the duplication of *knowledge* or *logic*. Sometimes, code that looks similar by coincidence serves different purposes and should remain separate to avoid "premature abstraction."

When applied correctly, DRY improves the clarity of the system and reduces the surface area for bugs. It encourages the use of functions, modules, and data structures to centralize common behaviors, making the codebase easier to reason about and evolve.

**Key Points**
*   Reduces inconsistency and maintenance effort by ensuring each logical concept exists in only one place in the codebase.

---

## 2. SOLID Principles
**Description**
SOLID is an acronym for five design principles intended to make software designs more understandable, flexible, and maintainable. These include Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.

The Single Responsibility Principle (SRP) ensures a class has only one reason to change, while the Open/Closed Principle (OCP) encourages classes to be open for extension but closed for modification. Together, they form the foundation of flexible object-oriented design.

Following SOLID helps prevent "code rot" and makes it much easier to refactor or extend the system as requirements change. It shifts the focus from writing just "working" code to writing "sustainable" code that can survive the long-term lifecycle of a project.

**Key Points**
*   Provides a rigorous framework for object-oriented design that prioritizes low coupling and high cohesion to ensure long-term system health.

---

## 3. DDD (Domain-Driven Design) - Tactical
**Description**
Tactical Domain-Driven Design (DDD) focuses on the implementation details within a single bounded context. It introduces patterns like Aggregates, Entities, Value Objects, and Domain Services to model the core business logic effectively.

Entities have a unique identity that persists over time, while Value Objects are defined only by their attributes and are immutable. Aggregates act as a cluster of associated objects that we treat as a single unit for data changes, ensuring consistency boundaries.

By using these tactical patterns, developers can ensure that the code closely reflects the business's mental model. This alignment reduces communication gaps between developers and stakeholders and leads to a more robust and expressive domain layer.

**Key Points**
*   Models complex business logic using structured patterns like Aggregates and Value Objects to ensure data consistency and domain clarity.

---

## 4. Dependency Injection / Inversion of Control
**Description**
Dependency Injection (DI) is a technique where an object receives its dependencies from an external source rather than creating them itself. This is a specific form of Inversion of Control (IoC), where the control over the flow of the program is shifted to a framework or container.

DI significantly improves testability because it allows dependencies (like a database or an API client) to be easily swapped with mocks or stubs during unit testing. It also reduces coupling by ensuring that classes depend on abstractions rather than concrete implementations.

In modern frameworks like Spring or Angular, DI is a core feature that manages the lifecycle of components. This allows developers to focus on business logic while the framework handles the "wiring up" of the system's various parts.

**Key Points**
*   Decouples components by externally providing dependencies, which dramatically improves testability and architectural flexibility.

---

## 5. Design Patterns (Singleton, Factory, Decorator, etc.)
**Description**
Design Patterns are reusable solutions to commonly occurring problems in software design. They represent best practices evolved by experienced software developers over time. Creational patterns like Singleton and Factory handle object creation, while Structural patterns like Decorator add behavior dynamically.

A Singleton ensures a class has only one instance, while a Factory provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created. These patterns provide a common vocabulary for developers to communicate complex design ideas.

Patterns like the Decorator allow for adding new functionality to an existing object without altering its structure, adhering to the Open/Closed principle. Understanding when *not* to use a pattern is just as important as knowing how to implement one, to avoid "over-engineering."

**Key Points**
*   Offers a standard language and proven solutions for structural and creational challenges, promoting code reuse and architectural consistency.

---

## 6. MVC - DAO / DTO / Repository
**Description**
Architectural patterns like MVC (Model-View-Controller) and data patterns like DAO (Data Access Object), DTO (Data Transfer Object), and Repository help organize the responsibilities of different layers in an application. They ensure a clean separation between data, logic, and presentation.

DAOs and Repositories abstract the details of data persistence, allowing the rest of the application to interact with data as if it were a simple collection. DTOs are used to transfer data between processes or layers without exposing internal entity structures.

This separation of concerns makes the application easier to maintain and test. It ensures that changes in the database schema don't leak into the business logic, and that UI changes don't require modifications to the underlying data models.

**Key Points**
*   Organizes application responsibilities into distinct layers, ensuring that data persistence and transfer details do not pollute the core business logic.

---

## 7. Reactive Programming
**Description**
Reactive Programming is a declarative programming paradigm concerned with data streams and the propagation of change. It is particularly useful for building highly responsive and scalable systems that can handle a large number of concurrent events.

In a reactive system, components react to incoming data or events as they happen, often using non-blocking I/O. This allows the system to remain responsive even under heavy load, as threads are not tied up waiting for external resources.

Frameworks like Project Reactor or RxJava provide tools to compose complex asynchronous workflows using functional-style operators. This approach shifts the focus from "how" to process data to "what" the result of the stream should be.

**Key Points**
*   Focuses on asynchronous data streams and event-driven logic to build highly scalable and responsive systems under high concurrency.

---

## 8. JWT Tokens
**Description**
JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. They are widely used for authentication and information exchange in modern web applications and microservices.

A JWT consists of a Header, a Payload, and a Signature. Since they are digitally signed, the receiver can verify that the claims have not been tampered with. This makes them ideal for stateless authentication, as the server doesn't need to store session state.

Because JWTs are self-contained and stateless, they enable easy horizontal scaling of services. However, they also require careful management, such as setting appropriate expiration times and handling token revocation securely.

**Key Points**
*   Enables secure, stateless authentication and claim exchange, facilitating the scalability of modern distributed architectures.
