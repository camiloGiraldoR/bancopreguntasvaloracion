## OAUTH2

OAuth 2.0 es un marco de autorización que permite a aplicaciones de terceros obtener acceso limitado a recursos HTTP en nombre de un usuario. Define roles como cliente, servidor de autorización y servidor de recursos, y flujos comunes como Authorization Code y Client Credentials.

## OPENID

OpenID Connect (OIDC) se construye sobre OAuth2 para proporcionar identidad (autenticación). Emite un `id_token` (JWT) con claims sobre el usuario autenticado.

## Authenticacion

Autenticación es el proceso de verificar la identidad de un usuario o cliente. Métodos comunes: contraseñas, autenticación multifactor (MFA) y enfoques modernos como FIDO2 y PKCE para clientes públicos.

## Autorizacion

Autorización determina qué puede hacer una identidad autenticada. Modelos: RBAC (roles), ABAC (basado en atributos) y evaluación de políticas basada en scopes/claims.

## IDP

Un Identity Provider (IdP) realiza la autenticación y emite tokens/claims (ej.: Keycloak, Auth0, Azure AD). Suele exponer OIDC/SAML y JWKS para la rotación de claves.

## SSO

Single Sign-On (SSO) permite que un usuario se autentique una vez y acceda a múltiples aplicaciones. Requiere manejo cuidadoso de sesiones y logout centralizado.

## Spring Security Configuration

Spring Security provee autenticación y autorización para aplicaciones Spring. La configuración incluye `SecurityFilterChain`, orden de filtros y habilitar resource server o clientes OAuth2 según el caso.

## Spring security annotations

Spring Security ofrece anotaciones a nivel de método como `@PreAuthorize`, `@PostAuthorize` y `@Secured` para aplicar reglas de autorización usando roles o expresiones SpEL.

## Recurso downstream

Un recurso downstream es una API a la que un servicio llama para completar una petición. Patrones seguros: token forwarding controlado, token exchange (RFC 8693), mTLS y minimizar scopes/audiencia.
