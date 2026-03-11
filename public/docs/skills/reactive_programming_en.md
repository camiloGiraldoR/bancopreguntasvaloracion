# Skill Descriptions: Reactive Programming

This document contains descriptions for each Reactive Programming skill. The reactive paradigm emphasizes responsiveness, resilience, elasticity, and message-driven communication.

---

## Responsive

**Description**
Responsive systems answer to users quickly and consistently. The system maintains predictable response times under varying loads, ensuring that user interactions feel snappy and reliable even during peak usage.

**Key Concepts**
- Consistent and predictable response times (latency bounded)
- Non-blocking I/O and event-driven processing
- Monitoring via P50, P95, P99 latency percentiles
- User perception of system liveliness

---

## Resilient

**Description**
Resilient systems remain operational despite failures. Resilience is achieved through component isolation, automatic recovery mechanisms, and failure containment—ensuring that failures in one part do not cascade throughout the entire system.

**Key Concepts**
- Fault tolerance and graceful degradation
- Circuit Breaker, Retry, and Fallback patterns
- Bulkheads: isolating threads, connections, or resources
- Supervision and self-healing capabilities

---

## Elastic

**Description**
Elastic systems automatically scale resources up or down based on demand without code changes. This allows applications to handle sudden spikes in traffic while maintaining responsiveness and cost-effectiveness during low periods.

**Key Concepts**
- Horizontal scaling (adding more instances)
- Vertical scaling (increasing machine resources)
- No shared state across replicas (stateless design)
- Metrics-driven auto-scaling
- Pay-per-use cost optimization

---

## Message Driven

**Description**
Message-driven systems use asynchronous message passing for inter-component communication rather than synchronous RPC calls. This decouples components, improves scalability, and enables better resilience through temporal decoupling.

**Key Concepts**
- Asynchronous, non-blocking message queues
- Pub-Sub and Request-Reply patterns
- Temporal and spatial decoupling of components
- At-Most-Once, At-Least-Once, Exactly-Once delivery guarantees

---

## Java WebFlux

**Description**
Spring WebFlux is a reactive web framework built on Project Reactor, enabling non-blocking, event-driven web applications. It handles high concurrency with fewer threads by leveraging asynchronous processing and backpressure handling.

**Real-World Example**
A real-time notification service receiving millions of user events per second. WebFlux efficiently handles all connections with a single event loop thread pool instead of one thread per request, dramatically reducing memory usage and improving responsiveness.

**Key Concepts**
- Functional and annotated endpoints (@RestController)
- Non-blocking I/O with Netty
- Backpressure handling and flow control
- Error handling with operators (onErrorReturn, onErrorResume)
- Integration with databases and services via reactive drivers

---

## Mono

**Description**
Mono is a reactive stream type from Project Reactor that emits 0 or 1 element, plus optionally error or completion signals. It represents an asynchronous operation with a single result (or no result), perfect for simple async computations.

**Real-World Example**
A REST endpoint that retrieves a user by ID. Instead of `User getUserById(Long id)`, you return `Mono<User>`. This allows the framework to handle thousands of concurrent requests efficiently without blocking threads waiting for database results.

**Key Concepts**
- Lazy evaluation (computation deferred until subscription)
- Transformation operators: map(), flatMap(), filter()
- Error handling: onErrorReturn(), onErrorResume()
- Difference from Optional: async, composable, non-blocking
- Never block: avoid block() in reactive chains

---

## Flux

**Description**
Flux is a reactive stream type from Project Reactor that emits 0 to N elements over time. It's ideal for representing streams of data that flow continuously, supporting backpressure to prevent overwhelming downstream consumers.

**Real-World Example**
A server-sent events (SSE) endpoint that streams stock price updates every 100ms to multiple clients. Flux<StockPrice> emits new prices as they arrive, and WebFlux handles backpressure: if a client falls behind, the server reduces emission rate automatically.

**Key Concepts**
- Creation: fromIterable(), range(), interval(), create()
- Composition: zip(), merge(), concat()
- Transformation: map(), flatMap(), concatMap()
- Filtering and buffering: filter(), buffer(), window()
- Error recovery: retry(), onErrorResume(), onErrorComplete()
