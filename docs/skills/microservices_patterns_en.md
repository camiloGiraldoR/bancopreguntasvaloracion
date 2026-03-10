````markdown
# Microservices Patterns

This document describes common architectural and design patterns used in microservices architectures. Each section provides a concise overview of the pattern, when to use it, benefits and considerations.

---

## CQRS (Command Query Responsibility Segregation)
**Description**
CQRS separates read (query) operations from write (command) operations, enabling independent scaling and optimization of each path. It allows specialized read models and can improve performance when read/write concerns differ.

**Considerations**
* Useful when read and write models diverge significantly.
* Adds complexity and requires projection/synchronization mechanisms.

---

## Database per service
**Description**
Each microservice owns its own database (or schema) to ensure independence and allow domain-optimized persistence choices.

**Considerations**
* Prevents schema coupling but complicates distributed transactions.

---

## Saga
**Description**
Pattern for handling distributed transactions by coordinating a series of local steps and compensating actions in failure cases. Can be orchestrated or choreographed.

**Considerations**
* Deals with eventual consistency and compensations.

---

## API Gateway
**Description**
A single entry point for clients that routes requests to backend microservices, handles auth, throttling, response aggregation and versioning.

**Considerations**
* Good place for cross-cutting concerns but can become a bottleneck if not scaled properly.

---

## Event Sourcing
**Description**
Instead of storing current state, persist all events that lead to the state. Allows reconstructing state and provides a full audit trail.

**Considerations**
* Enables historical reconstruction but adds complexity for querying; projections are required.

---

## Sidecar
**Description**
A deployment pattern where an auxiliary process (sidecar) runs alongside the main service to provide cross-cutting features (logging, proxies, cert management, network proxy).

**Considerations**
* Separates concerns without modifying the main service.

---

## Circuit Breaker
**Description**
Mechanism to prevent repeated calls to failing services, improving resilience via fallback, retries, and controlled degradation.

**Considerations**
* Prevents failure cascades and reduces load on degraded services.

---

## BFF (Backend For Frontend)
**Description**
A layer tailored to each client type (web, mobile) that composes and adapts backend APIs to client needs.

**Considerations**
* Improves client experience but requires maintaining multiple BFF services.

---

## Journey
**Description**
A conceptual pattern to map and design business flows (customer journeys) across services, ensuring each stage has clear ownership and well-defined events.

**Considerations**
* Useful to align architecture with business processes and stage metrics.

````