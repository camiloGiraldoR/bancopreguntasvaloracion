# Skill Descriptions: Design Patterns

This document contains concise descriptions for each design pattern included in the `Design Patterns` group. Each section provides an overview and key points to help interviewers and candidates align on intent and trade-offs.

---

## Singleton-CRE
**Description**
Ensures a class has only one instance and provides a global point of access to it. Useful for shared configuration objects, connection pools, or registries. In concurrent contexts, implementations must address thread-safety, lazy initialization and serialization concerns.

**Key Points**
- Guarantees single instance per JVM (not distributed).
- Common implementations: enum singleton, holder class, double-check locking.

---

## FactoryMethod-CRE
**Description**
Defines an interface for creating an object but lets subclasses decide which class to instantiate. The Factory Method encapsulates object creation and supports open/closed extension by adding new concrete creators.

**Key Points**
- Decouples client code from concrete classes.
- Promotes extensibility via subclassing or registration.

---

## AbstractFactory-CRE
**Description**
Provides an interface for creating families of related or dependent objects without specifying their concrete classes. It ensures compatibility between products of a family and centralizes creation logic.

**Key Points**
- Suitable when multiple related products must be used together.
- Adds structural boilerplate (several factory classes).

---

## Builder-CRE
**Description**
Separates the construction of a complex object from its representation, enabling step-by-step construction and readable client code. Useful for objects with many optional parameters or complex invariants.

**Key Points**
- Improves readability vs telescoping constructors.
- Works well with immutable objects.

---

## Prototype-CRE
**Description**
Creates new instances by cloning an existing prototype, which can be more efficient when object construction is costly. Careful handling of shallow vs deep copy is required when state references mutable objects.

**Key Points**
- Efficient for expensive initialization.
- Cloning semantics (shallow/deep) must be defined clearly.

---

## Adapter-ST
**Description**
Converts the interface of a class into another interface clients expect. Adapter lets otherwise incompatible classes work together by wrapping the adaptee.

**Key Points**
- Useful for integrating legacy code or third-party APIs.
- Prefer object adapter (composition) over class adapter when possible.

---

## Decorator-ST
**Description**
Dynamically adds responsibilities to objects without modifying their code by wrapping them in decorator objects that implement the same interface.

**Key Points**
- Allows flexible composition of behaviors at runtime.
- Beware of long wrapper chains that complicate debugging.

---

## Proxy-ST
**Description**
Provides a surrogate or placeholder for another object to control access, add behavior (caching, logging, security), or manage resource acquisition (lazy loading).

**Key Points**
- Common uses: lazy loading, remote proxies, protection proxies.
- Can be implemented with dynamic proxies in many languages.

---

## Facade-ST
**Description**
Offers a simplified, higher-level interface to a complex subsystem, reducing coupling between the client and the subsystem internals.

**Key Points**
- Simplifies usage of a subsystem.
- Keep facade APIs small and stable to avoid becoming an anti-pattern.

---

## Composite-ST
**Description**
Composes objects into tree structures to represent part-whole hierarchies and lets clients treat individual objects and compositions uniformly.

**Key Points**
- Enables uniform operations on leaf and composite nodes.
- Traversal and concurrent access must be considered for large trees.

---

## Observer-COM
**Description**
Defines a one-to-many dependency so that when one object changes state, all its dependents are notified and updated automatically. Useful for event-driven or reactive designs.

**Key Points**
- Decouples subject from observers.
- Manage registrations to avoid memory leaks.

---

## Strategy-COM
**Description**
Encapsulates interchangeable algorithms inside strategy objects, letting the algorithm vary independently from clients that use it.

**Key Points**
- Promotes open/closed; strategies can be added without modifying clients.
- Register or inject strategies for runtime selection.

---

## Command-COM
**Description**
Encapsulates a request as an object, allowing parameterization of clients with different requests, queuing, logging, and supporting undoable operations.

**Key Points**
- Useful for queuing, logging and undo/redo operations.
- Commands should be designed idempotent for safe retries.

---

## Chain of Responsibility-COM
**Description**
Passes a request along a chain of handlers; each handler decides either to process the request or pass it to the next handler. This reduces coupling between sender and receivers.

**Key Points**
- Enables flexible assignment of responsibility to handlers.
- Provide a default handler for unhandled requests.

