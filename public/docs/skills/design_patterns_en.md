# Skill Descriptions: Design Patterns

This document contains concise descriptions for each design pattern included in the `Design Patterns` group. Each section provides an overview and key points to help interviewers and candidates align on intent and trade-offs.

---

## Singleton-CRE
**Description**
Ensures a class has only one instance and provides a global point of access to it. Useful for shared configuration objects, connection pools, or registries. In concurrent contexts, implementations must address thread-safety, lazy initialization and serialization concerns.

**Real-World Example**
A logging system in a banking application. You need a single Logger instance to write all events to the same log file. Using Singleton ensures that all classes throughout the application write to the same logger without creating multiple instances that would cause file locking or lost messages.

**Key Points**
- Guarantees single instance per JVM (not distributed).
- Common implementations: enum singleton, holder class, double-check locking.

---

## FactoryMethod-CRE
**Description**
Defines an interface for creating an object but lets subclasses decide which class to instantiate. The Factory Method encapsulates object creation and supports open/closed extension by adding new concrete creators.

**Real-World Example**
A document processing system that must support different file formats (PDF, Word, Excel). Instead of the client deciding which DocumentFactory to use, each document type has its own factory. When you add a new format like PowerPoint, you simply create a new concrete factory without changing existing code.

**Key Points**
- Decouples client code from concrete classes.
- Promotes extensibility via subclassing or registration.

---

## AbstractFactory-CRE
**Description**
Provides an interface for creating families of related or dependent objects without specifying their concrete classes. It ensures compatibility between products of a family and centralizes creation logic.

**Real-World Example**
A UI framework that must support multiple themes (Light Theme and Dark Theme). Each theme needs matching Button, TextBox, and Dialog components. AbstractFactory ensures that when you select a theme, all UI components are created in that theme—you'll never mix a Light Button with a Dark TextBox.

**Key Points**
- Suitable when multiple related products must be used together.
- Adds structural boilerplate (several factory classes).

---

## Builder-CRE
**Description**
Separates the construction of a complex object from its representation, enabling step-by-step construction and readable client code. Useful for objects with many optional parameters or complex invariants.

**Real-World Example**
Creating an HttpRequest object with many optional headers, body, authentication, timeouts, etc. Instead of a constructor with 20 parameters, you use a Builder: new RequestBuilder().url("http://...").header("Auth", token).timeout(5000).retries(3).build(). This is much clearer and allows composing complex requests step-by-step.

**Key Points**
- Improves readability vs telescoping constructors.
- Works well with immutable objects.

---

## Prototype-CRE
**Description**
Creates new instances by cloning an existing prototype, which can be more efficient when object construction is costly. Careful handling of shallow vs deep copy is required when state references mutable objects.

**Real-World Example**
A design application where users create complex graphics with many properties. Instead of recreating from scratch each time, you clone a pre-configured graphic template. If you have a "Rounded Rectangle" prototype with specific colors, shadows, and effects already set, cloning it is far faster than reapplying all properties manually.

**Key Points**
- Efficient for expensive initialization.
- Cloning semantics (shallow/deep) must be defined clearly.

---

## Adapter-ST
**Description**
Converts the interface of a class into another interface clients expect. Adapter lets otherwise incompatible classes work together by wrapping the adaptee.

**Real-World Example**
You have an old legacy system with a LegacyPaymentProcessor that uses an outdated interface. Your new system expects a PaymentGateway interface. Instead of rewriting the legacy system, you create a PaymentAdapter that wraps the legacy processor and translates calls: the new code calls adapter.processPayment(), which internally calls the legacy processor's oldProcess() method.

**Key Points**
- Useful for integrating legacy code or third-party APIs.
- Prefer object adapter (composition) over class adapter when possible.

---

## Decorator-ST
**Description**
Dynamically adds responsibilities to objects without modifying their code by wrapping them in decorator objects that implement the same interface.

**Real-World Example**
A coffee shop ordering system. You start with a base Coffee object. At runtime, customers can add features: new CinnamonDecorator(new WhipCreamDecorator(new MilkDecorator(coffee))). Each decorator wraps the previous one, adding price and description. This avoids creating separate CoffeeWithMilk, CoffeeWithCinnamon, CoffeeWithMilkAndCinnamon classes.

**Key Points**
- Allows flexible composition of behaviors at runtime.
- Beware of long wrapper chains that complicate debugging.

---

## Proxy-ST
**Description**
Provides a surrogate or placeholder for another object to control access, add behavior (caching, logging, security), or manage resource acquisition (lazy loading).

**Real-World Example**
Loading a high-resolution image from a remote server is slow. Instead of loading immediately, you create an ImageProxy that appears identical to the real image. When the client actually uses it, the proxy loads the real image in the background, caching it for future accesses. The client code remains unaware of this lazy-loading mechanism.

**Key Points**
- Common uses: lazy loading, remote proxies, protection proxies.
- Can be implemented with dynamic proxies in many languages.

---

## Facade-ST
**Description**
Offers a simplified, higher-level interface to a complex subsystem, reducing coupling between the client and the subsystem internals.

**Real-World Example**
A bank's home lending process involves many subsystems: credit checking, income verification, document processing, appraisal, insurance. Instead of the client interacting with each subsystem, you create a LoanFacade that exposes a simple applyForLoan() method, hiding the complex orchestration of all those subsystems internally.

**Key Points**
- Simplifies usage of a subsystem.
- Keep facade APIs small and stable to avoid becoming an anti-pattern.

---

## Composite-ST
**Description**
Composes objects into tree structures to represent part-whole hierarchies and lets clients treat individual objects and compositions uniformly.

**Real-World Example**
A file system where a folder can contain files or other folders (subfolders). Using Composite, both File and Folder implement a common interface. A client can call getSize() on either—a File returns its size, a Folder recursively sums sizes of all children. Clients don't distinguish between individual files and complex directory trees.

**Key Points**
- Enables uniform operations on leaf and composite nodes.
- Traversal and concurrent access must be considered for large trees.

---

## Observer-COM
**Description**
Defines a one-to-many dependency so that when one object changes state, all its dependents are notified and updated automatically. Useful for event-driven or reactive designs.

**Real-World Example**
A stock price ticker system. When a stock price changes, multiple interested parties (traders, risk managers, notifications service) need to be informed immediately without the stock system knowing about them. The stock notifies all registered observers, and each handles the update in its own way.

**Key Points**
- Decouples subject from observers.
- Manage registrations to avoid memory leaks.

---

## Strategy-COM
**Description**
Encapsulates interchangeable algorithms inside strategy objects, letting the algorithm vary independently from clients that use it.

**Real-World Example**
An e-commerce checkout system calculates shipping costs differently based on the selected strategy: StandardShipping (flat fee), ExpressShipping (weight-based), or FreeShipping (for orders over a threshold). The order doesn't care which strategy is used; it just calls strategy.calculateCost(). New strategies can be added without touching the Order class.

**Key Points**
- Promotes open/closed; strategies can be added without modifying clients.
- Register or inject strategies for runtime selection.

---

## Command-COM
**Description**
Encapsulates a request as an object, allowing parameterization of clients with different requests, queuing, logging, and supporting undoable operations.

**Real-World Example**
A text editor where each user action (type, delete, format) is a Command object. The editor maintains a command history and can undo/redo by calling previous commands' undo() or redo() methods. A macro feature can queue commands for later batch execution, and all operations are logged for auditing.

**Key Points**
- Useful for queuing, logging and undo/redo operations.
- Commands should be designed idempotent for safe retries.

---

## Chain of Responsibility-COM
**Description**
Passes a request along a chain of handlers; each handler decides either to process the request or pass it to the next handler. This reduces coupling between sender and receivers.

**Real-World Example**
A support ticket system where requests flow through handlers: FirstLineSupport → SpecialistSupport → Manager. A ticket asking to restart a service might be resolved by FirstLineSupport. A complex technical issue gets passed to SpecialistSupport. Management decisions go to the Manager. Each handler in the chain decides to handle or delegate without the client knowing the structure.

**Key Points**
- Enables flexible assignment of responsibility to handlers.
- Provide a default handler for unhandled requests.

