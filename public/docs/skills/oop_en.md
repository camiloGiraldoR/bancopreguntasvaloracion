# Skill Descriptions: Object Oriented Programming (OOP)

This document provides a detailed overview of the fundamental pillars of Object-Oriented Programming as defined in the Perficient assessment application.

---

## 1. Encapsulation
**Description**
Encapsulation is the mechanism of bundling data (fields) and the methods that operate on that data into a single unit called a class. It involves hiding the internal state of an object from the outside world and requiring all interactions to happen through a well-defined public interface, typically using getters and setters.

By restricting direct access to an object's components, encapsulation prevents accidental interference and misuse of data. It allows developers to change the internal implementation of a class (e.g., changing a data structure) without affecting the code that uses the class, as long as the public API remains consistent.

At a more advanced level, encapsulation supports the "Tell, Don't Ask" principle, where you instruct an object to perform an action using its own data rather than asking for the data to make a decision outside of it. This reduces coupling and keeps logic where the data resides.

**Key Points**
*   Protects the integrity of an object's internal state by forcing interaction through public methods, facilitating maintainability and reducing system coupling.

---

## 2. Abstraction
**Description**
Abstraction is the process of hiding complex implementation details and showing only the essential features of an object. In Java, this is primarily achieved through Abstract Classes and Interfaces, which allow developers to define "what" an object does without necessarily specifying "how" it does it.

An abstract class serves as a partial template that can hold state and common logic, while an interface defines a pure contract of behavior. Choosing between them depends on whether you are defining a shared identity (is-a) or a shared capability (can-do).

Effective abstraction leads to the principle of "programming to an interface, not an implementation." This allows parts of a system to remain independent, making it easier to swap out concrete implementations (like different database drivers) without breaking the overall application.

**Key Points**
*   Reduces cognitive load and system complexity by focusing on high-level behaviors rather than low-level implementation details.

---

## 3. Inheritance
**Description**
Inheritance allows a new class (subclass) to acquire the properties and behaviors of an existing class (superclass). In Java, this is implemented using the `extends` keyword, promoting code reuse and establishing a hierarchical relationship between types.

While powerful, inheritance should be used carefully to avoid deep hierarchies that make code fragile and hard to follow. The Liskov Substitution Principle (LSP) dictates that a subclass must be able to replace its superclass without altering the correctness of the program.

Modern design often favors "Composition over Inheritance" (has-a vs. is-a). Composition offers more flexibility as it allows behaviors to be changed at runtime by swapping components, whereas inheritance creates a rigid, compile-time relationship.

**Key Points**
*   Facilitates code reuse and hierarchical organization, but must be governed by substitution principles and often balanced with composition for better flexibility.

---

## 4. Polymorphism
**Description**
Polymorphism, meaning "many forms," allows objects of different classes to be treated as objects of a common superclass or interface. This enables a single method call to behave differently depending on the actual type of the object it is invoked upon at runtime.

Java supports both compile-time polymorphism (Method Overloading) and runtime polymorphism (Method Overriding). Overriding is facilitated by "Dynamic Method Dispatch," where the JVM decides which implementation to run based on the object's real type.

This pillar is central to many architectural patterns, such as the Strategy Pattern, where different algorithms can be interchanged seamlessly. It allows for the creation of extensible systems where new types can be added with minimal changes to existing code.

**Key Points**
*   Enables extensible and flexible designs by allowing different implementations to be used interchangeably through a common interface or superclass.
