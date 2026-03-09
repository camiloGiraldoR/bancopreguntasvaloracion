# Skill Descriptions: REST (Representational State Transfer)

This document covers the principles of RESTful architecture, including API design, security, protocol methods, and best practices for building scalable web services.

---

## 1. API Versioning
**Description**
API versioning is the practice of managing changes to an API in a way that doesn't break existing client integrations. As business requirements evolve, the API must change, but old clients may not be ready to update immediately.

Common strategies include versioning in the URL (e.g., /v1/users), which is easy to read and cache, or using custom headers. Another advanced method is "Media Type" or "Content Negotiation," where the version is specified in the Accept header, keeping the URL structure clean.

Semantic Versioning (SemVer) is often applied to APIs to communicate the nature of changes. A MAJOR version increment signals breaking changes, while MINOR and PATCH versions indicate backward-compatible improvements or fixes.

**Key Points**
*   Ensures long-term API stability and backward compatibility through structured versioning strategies and clear communication of contract changes.

---

## 2. API Design (RESTful Principles)
**Description**
A RESTful API follows specific architectural constraints, the most important being that it is "Resource-Based." Each entity (User, Order) is identified by a unique URI, and interactions are performed using standard HTTP methods.

Another key principle is "Statelessness," meaning every request from a client must contain all the information necessary to understand and process it. The server does not store any client context between requests, which greatly improves scalability.

HATEOAS (Hypermedia as the Engine of Application State) is an advanced REST feature where the API response includes links to related resources. This makes the API "self-discoverable," allowing clients to navigate the system dynamically.

**Key Points**
*   Builds scalable and intuitive interfaces by adhering to resource-oriented, stateless communication and hypermedia-driven navigation principles.

---

## 3. CORS (Cross-Origin Resource Sharing)
**Description**
CORS is a browser-based security mechanism that restricts web pages from making requests to a domain different from the one that served the page. Without CORS, any malicious site could potentially make requests to your API in the user's name.

When a browser detects a "complex" request (like a POST with a JSON body), it first sends a "Preflight" (OPTIONS) request to check if the server allows the origin, methods, and headers. The server must respond with the appropriate 'Access-Control-Allow-Origin' headers.

Configuring 'Access-Control-Allow-Origin: *' is a common but dangerous mistake for APIs that use cookies or sensitive data, as it allows any website to interact with the service. Proper CORS management requires a strict whitelist of trusted domains.

**Key Points**
*   Protects APIs from unauthorized cross-domain access through browser-enforced origin validation and strict server-side headers.

---

## 4. API Calls (Headers and Clients)
**Description**
API interaction relies heavily on HTTP headers to convey metadata. 'Content-Type' tells the server the format of the data being sent (e.g., application/json), while the 'Authorization' header carries security credentials like JWT or Basic Auth tokens.

Developers use various clients to test and integrate APIs. Tools like Postman or Insomnia are great for manual testing, while libraries like Fetch, Axios (JavaScript), or Spring's WebClient (Java) are used for programmatic access.

In Java, WebClient has largely replaced the older RestTemplate because it is non-blocking and reactive. Using interceptors in these clients allows for centralized logic, such as automatically attaching tokens or logging all outgoing requests.

**Key Points**
*   Manages API communication through standardized metadata headers and specialized clients, leveraging reactive and non-blocking tools for modern architectures.

---

## 5. Cookies and Sessions (Stateless vs Stateful)
**Description**
Traditionally, web apps used server-side sessions and cookies to track users. The server stores a session ID in a cookie, and for every request, it looks up the user's data in its own memory. This is "Stateful" and can be hard to scale horizontally.

Modern APIs prefer "Stateless" authentication using Tokens (JWT). The token itself contains all the necessary user data, so the server doesn't need to store anything. This makes it much easier to scale across multiple servers or regions.

When using cookies, security attributes are vital. 'HttpOnly' prevents JavaScript from accessing the cookie (mitigating XSS attacks), while 'Secure' ensures it's only sent over HTTPS. 'SameSite' attributes help prevent CSRF (Cross-Site Request Forgery).

**Key Points**
*   Moves from legacy, server-dependent state management to modern, token-based stateless architectures to enhance scalability and security.

---

## 6. API Construction and URLs
**Description**
A well-constructed API should be intuitive and follow logical patterns. Endpoints should use plural nouns for resources (e.g., /products) instead of verbs (e.g., /getAllProducts). This keeps the URL structure consistent and easy to guess.

Using the right part of the URL for the right purpose is key: Path Variables should be used to identify a specific resource (e.g., /users/123), while Query Parameters are for filtering, sorting, or pagination (e.g., /users?age=30).

Documentation is also part of "construction." Tools like OpenAPI (Swagger) provide a standardized way to describe the API, allowing for the automatic generation of interactive documentation and even client libraries for different programming languages.

**Key Points**
*   Defines intuitive and consistent access points through resource-based URL structures and standardized documentation for better developer experience.

---

## 7. HTTP Methods: CRUD and Beyond
**Description**
HTTP methods define the action to be performed on a resource. GET is for reading, POST for creating, PUT for replacing, PATCH for partial updates, and DELETE for removing. These map closely to the standard CRUD operations.

Understanding "Safety" and "Idempotency" is advanced but critical. GET and HEAD are "Safe" because they don't change state. PUT and DELETE are "Idempotent" because calling them multiple times with the same data leads to the same final state on the server.

POST is *not* necessarily idempotent; calling it twice might create two identical records. Recognizing these properties helps in designing reliable systems, especially when implementing "Retry" logic on the client side during network failures.

**Key Points**
*   Standardizes resource manipulation through well-defined HTTP verbs, distinguishing between safe and idempotent operations to build reliable and predictable APIs.

---

## 8. Digital Certificates (SSL/TLS)
**Description**
Security in transit is mandatory. HTTPS (HTTP over SSL/TLS) ensures that all data exchanged between the client and server is encrypted and protected from "Man-in-the-Middle" attacks.

The process starts with a "Handshake" where the server presents a Digital Certificate to prove its identity. This certificate contains a Public Key used by the client to encrypt data, while the server uses its secret Private Key to decrypt it.

For internal services (Microservices), Mutual TLS (mTLS) is often used. This requires *both* the client and the server to present certificates, ensuring that only trusted components can communicate with each other within the private network.

**Key Points**
*   Encrypts and authenticates communication through standardized certificates and keys, ensuring data privacy and integrity across the network.

---

## 9. HTTP Response Codes
**Description**
Response codes are the standardized way for a server to communicate the result of a request. They are grouped into ranges: 2xx for success, 3xx for redirection, 4xx for client errors, and 5xx for server errors.

Common codes include 200 OK (Generic success), 201 Created (Success after POST), 400 Bad Request (Invalid input), 401 Unauthorized (Missing login), 403 Forbidden (Missing permissions), and 500 Internal Error (Crash).

Using the most specific code possible is vital for error handling. For example, 409 Conflict is perfect for duplicate records, while 429 Too Many Requests informs the client they have exceeded their rate limit and should slow down.

**Key Points**
*   Communicates request outcomes through a standardized numeric system, enabling automated and consistent error handling and success validation.
