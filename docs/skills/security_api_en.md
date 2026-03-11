## OAUTH2

OAuth 2.0 is an authorization framework that enables applications to obtain limited, delegated access to HTTP resources on behalf of a resource owner without sharing user credentials. At its core OAuth2 separates duties across actors and tokens so systems can securely grant, validate and revoke access.

Pillars and core concepts:
- Roles: resource owner (user), client (app requesting access), authorization server (issues tokens) and resource server (API protecting resources).
- Grant types (flows): Authorization Code (for confidential apps), Implicit (deprecated for security reasons), Client Credentials (machine-to-machine), Resource Owner Password Credentials (legacy) and Refresh Token flows.
- Tokens: Access Tokens (short-lived, used to call resource servers) and Refresh Tokens (longer-lived, used to obtain new access tokens). Implementation detail: tokens can be opaque or JWTs.
- Scopes and least-privilege: scopes declare which actions or resources the client requests; services should enforce minimal privileges.
- Security considerations: use short-lived access tokens, secure storage for refresh tokens, PKCE for public clients, validate issuer/audience/signature/expiration, and provide revocation/introspection endpoints.

OAuth2 is focused on authorization (who can do what). For identity (authentication) OIDC builds a layer on top of OAuth2 (see OpenID section).

## OPENID

OpenID Connect (OIDC) is an identity layer built on top of OAuth2 that standardizes authentication and identity information exchange. While OAuth2 grants access, OIDC provides a verified identity token (the `id_token`) that consumers can use to assert who the user is.

Pillars and essential components:
- ID Token: a JWT that contains claims about the authentication event and the user (e.g., `sub`, `iss`, `aud`, `exp`, `nonce`, and optional profile claims such as `name`, `email`).
- Discovery & Metadata: a well-known discovery endpoint (`/.well-known/openid-configuration`) that exposes endpoints (authorization, token, userinfo) and supported algorithms so clients can configure dynamically.
- JWKS (JSON Web Key Set): the authorization server publishes public keys (JWKS) used to verify signatures of JWTs; clients must fetch and cache keys and handle rotation.
- UserInfo endpoint: an authenticated endpoint to request additional profile claims about the user when not included in the id_token.
- Security bindings: `nonce` and `state` to prevent replay and CSRF in front-channel flows; PKCE for public clients.

OIDC scopes (`openid`, `profile`, `email`, etc.) and claims provide a standardized way to request identity data. Proper integration requires verifying id_token signatures, validating `aud` and `iss`, checking `exp` and `nonce`, and using HTTPS for all endpoints.

## OAUTH2

OAuth 2.0 is the de facto authorization framework used to grant limited access to HTTP resources without sharing user credentials. It separates responsibilities (clients, authorization servers and resource servers) and defines token types and flows so that applications and APIs can interoperate securely.

Key concepts and best practices:

- Roles: a clear separation exists between the resource owner (user), the client (application requesting access), the authorization server (which authenticates and issues tokens) and the resource server (the API enforcing access). Understanding these roles is essential when designing flows and trust boundaries.

- Grant types (flows): Authorization Code (recommended for confidential clients with a backend), Authorization Code + PKCE (recommended for public clients like SPAs and mobile), Client Credentials (machine-to-machine), and Refresh Tokens (to obtain new access tokens). Avoid Implicit flow in new designs.

- Tokens: Access tokens are short-lived credentials presented to resource servers. Refresh tokens (if used) are long-lived and must be stored securely. Tokens can be opaque (validated by introspection) or structured (JWT) — both have trade-offs in validation performance and revocation.

- Scopes & least privilege: request the minimal set of scopes required. Design coarse-grained scopes for common access and fine-grained claims when necessary, and validate scopes on the resource server side.

- Security controls: always use HTTPS; prefer short-lived tokens; protect refresh tokens (httpOnly cookies or encrypted storage); use PKCE for public clients; validate token signature, issuer (`iss`), audience (`aud`) and expiration (`exp`); and implement revocation and introspection endpoints to allow immediate invalidation when necessary.

Practical considerations:

- Implement token revocation and monitoring to detect suspicious usage. Use rotating refresh tokens to reduce replay risk. Consider token exchange (RFC 8693) when delegating credentials between services to adapt audience and scopes.

OAuth2 is focused on authorization (delegated access). For proven identity assertions on top of OAuth2 use OpenID Connect.

## OPENID

OpenID Connect (OIDC) is an identity layer that standardizes authentication on top of OAuth2. It provides interoperable authentication semantics and a defined set of claims so clients can reliably learn who the user is and which authentication event occurred.

Fundamental pillars:

- ID Token: a signed JWT (commonly) which contains claims about the authentication event and the user (e.g., `sub`, `iss`, `aud`, `exp`, `iat`, `nonce` and optionally profile claims such as `name`, `email`). Always verify signature, `iss`, `aud` and `exp` before trusting the token.

- Discovery & metadata: the `/.well-known/openid-configuration` endpoint allows clients to discover authorization, token, userinfo and JWKS endpoints, supported scopes and algorithms — enabling dynamic and robust client configuration.

- JWKS & key rotation: the authorization server exposes its public keys via JWKS. Clients should fetch and cache keys with sensible caching and refresh strategies to handle rotation without downtime.

- UserInfo endpoint: when claims are not present or are insufficient in the `id_token`, clients can retrieve additional profile information from the UserInfo endpoint using the access token.

- Security bindings: `state` prevents CSRF in the authorization request; `nonce` binds the authorization response to the client’s authentication request to prevent replay. PKCE is critical for public clients.

Operational guidance:

- Always validate tokens on the client or resource server side (signature, claims and timestamps). Prefer authorization servers that support well-known endpoints, introspection and revocation. Consider privacy: minimize claims returned and avoid storing PII unnecessarily.

OIDC provides a standard, auditable identity layer that, combined with OAuth2 authorization, covers most modern authentication and authorization needs for web, mobile and API ecosystems.

## AUTHENTICATION

Authentication is the process of proving identity (who the user or client is). Common approaches include passwords, multi-factor authentication (MFA), and modern public-key based solutions (FIDO2). Best practices include secure password storage (bcrypt/argon2), rate limiting for login attempts, account recovery controls and anomaly detection (unusual IPs or device changes). For public clients favor OIDC flows with PKCE and avoid sending credentials directly when possible.

## AUTHORIZATION

Authorization decides what an authenticated identity can do. Models include RBAC (role-based access control), ABAC (attribute-based access control) and policy-based approaches (e.g., OPA). In API ecosystems, use claims and scopes in tokens to represent permissions and enforce them at resource servers and gateways. Log authorization decisions for auditability and periodically review role assignments to prevent privilege creep.

## IDP (Identity Provider)

An Identity Provider centralizes authentication and identity management. Typical IdPs expose OIDC and SAML protocols, JWKS endpoints, user management APIs and often support federation. When designing an IdP plan for HA, key rotation, tenant isolation (if multi-tenant) and provisioning (SCIM) to avoid manual user syncs.

## SSO

Single Sign-On (SSO) simplifies the user experience by delegating authentication to a central IdP. For enterprise SSO consider SAML or OIDC-based federation; for modern apps OIDC is usually preferred. Implement single logout with care — full logout across many SPs is difficult; design for best-effort and document expected behavior.

## SPRING SECURITY CONFIGURATION

Spring Security is the standard security framework for Spring applications. Key aspects include configuring a `SecurityFilterChain`, ordering filters properly (CORS/CSRF/auth filters), integrating resource-server JWT validation or introspection, and enabling method security. For high-scale services move heavy policy decisions outside per-request filters (e.g., push policy to a gateway or authorization service) and cache validation results responsibly.

## SPRING SECURITY ANNOTATIONS

Spring supports method-level security through annotations like `@PreAuthorize`, `@PostAuthorize`, `@Secured` and new `@RolesAllowed` patterns. Use them to express authorization intent close to the code, but avoid scattering complex policies across many methods — prefer delegating to a central authorization service or concise policy functions to keep rules testable and maintainable.

## DOWNSTREAM RESOURCES

Downstream resources are services your API calls. Secure calls to downstreams by applying token best practices: minimize forwarded scopes, use token exchange when translating audiences, consider mutual TLS (mTLS) between services, enforce retries with circuit breakers, and monitor call latency and failures. Ensure downstreams validate tokens and scopes themselves — never assume trust by proxy.

## HTTPS & TLS

HTTP vs HTTPS: Always prefer HTTPS. HTTP transmits data in cleartext over the network; HTTPS uses TLS to encrypt the transport, protecting confidentiality and integrity of requests and responses. Any API or web site that handles sensitive data or authentication flows must require HTTPS.

What TLS provides:

- Encryption: prevents eavesdroppers from reading the payload.
- Integrity: detects tampering of the data in transit.
- Authentication: server proves its identity using certificates issued by trusted CAs; clients verify the certificate chain.

Practical TLS guidance:

- Enforce TLS 1.2+ (prefer TLS 1.3) and disable legacy/weak ciphers.
- Use HSTS (Strict-Transport-Security) for browsers to reduce downgrade attacks.
- Validate certificates properly (verify chain, `hostname`, `notBefore`/`notAfter`) and use OCSP stapling to improve revocation checks.
- Protect cookies (HttpOnly, Secure, SameSite) and prefer storing tokens in secure storage rather than localStorage in browsers.
- Consider mTLS for service-to-service authentication in internal networks where mutual identity verification is required.
- Decide carefully where TLS terminates: terminating TLS at a load balancer or gateway is common, but if you need end-to-end encryption for compliance, ensure TLS is re-established to the backend or use TLS passthrough.

Summary: TLS is a foundational control — enforce it everywhere, monitor certificate lifecycles, and pair it with other controls (auth, logging, least privilege) to reduce attack surface.
