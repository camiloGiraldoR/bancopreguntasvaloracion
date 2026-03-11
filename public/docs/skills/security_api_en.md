## OAUTH2

OAuth 2.0 is an authorization framework that allows third-party applications to obtain limited access to an HTTP service on behalf of a resource owner. It defines roles like client, authorization server and resource server and common flows such as Authorization Code and Client Credentials.

## OPENID

OpenID Connect (OIDC) builds on OAuth2 to provide identity (authentication) in addition to authorization. It issues an ID Token (JWT) that contains claims about the authenticated user.

## Authenticacion

Authentication is the process of verifying the identity of a user or client. Common methods include passwords, multi-factor authentication (MFA), and modern approaches like FIDO2 and PKCE for public clients.

## Autorizacion

Authorization determines what an authenticated identity is allowed to do. Models include RBAC (roles), ABAC (attribute-based) and fine-grained policy evaluation based on scopes and claims.

## IDP

An Identity Provider (IdP) is a system that performs authentication and issues tokens/claims (examples: Keycloak, Auth0, Azure AD). IdPs often expose OIDC and SAML endpoints and a JWKS for key discovery.

## SSO

Single Sign-On (SSO) allows a user to authenticate once and access multiple applications. Common protocols include SAML and OIDC; SSO requires careful session and logout handling.

## Spring Security Configuration

Spring Security provides authentication and authorization capabilities for Spring applications. Configuration typically involves a `SecurityFilterChain`, filter ordering, and configuring resource server or oauth2 clients.

## Spring security annotations

Spring Security offers method-level annotations such as `@PreAuthorize`, `@PostAuthorize` and `@Secured` to enforce authorization rules using roles or SpEL expressions.

## Recurso downstream

A downstream resource is an external or internal API a service calls to fulfill a request. Secure patterns include token forwarding, token exchange, mTLS and limiting scopes/audiences to reduce blast radius.
