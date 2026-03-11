## OAUTH2

OAuth 2.0 es el marco estándar para delegar autorizaciones sin compartir credenciales. Permite que aplicaciones (clientes) obtengan tokens que representan permisos limitados sobre recursos protegidos, y separa claramente las responsabilidades de autenticación/ emisión de tokens y validación de acceso.

Conceptos y buenas prácticas:

- Roles: identificar resource owner (usuario), client (aplicación), authorization server (emisor de tokens) y resource server (API que valida tokens). Delimitar confianza entre estos componentes al diseñar tu arquitectura.

- Flujos: Authorization Code (para aplicaciones con backend), Authorization Code + PKCE (para clientes públicos), Client Credentials (para comunicaciones back-end entre servicios) y uso de Refresh Tokens para mantener sesiones seguras. Evitar el flujo Implicit por problemas de seguridad.

- Tokens: los access tokens deben ser de corta duración y validados correctamente; los refresh tokens requieren almacenamiento seguro y rotación (rotating refresh tokens) para reducir riesgo de replay.

- Scopes y principio de menor privilegio: diseñar scopes que reflejen acciones de negocio y exigir solo lo necesario. Validar scopes en resource servers y mapearlos a permisos internos.

- Seguridad operativa: exigir HTTPS, validar firma/issuer/audience/exp, habilitar introspección/revocación, y proteger refresh tokens (cookies httpOnly o almacenes cifrados).

## OPENID

OpenID Connect (OIDC) añade una capa de identidad sobre OAuth2, estandarizando cómo se representa y transmite la información del usuario autenticado. Proporciona mecanismos auditables y verificados para conocer quién se autenticó y cómo.

Componentes clave:

- ID Token: normalmente un JWT firmado que incluye claims como `sub`, `iss`, `aud`, `exp` y `nonce`, y opcionalmente `name`, `email`. Validar firma y claims antes de confiar en el token.

- Discovery y metadatos: `/.well-known/openid-configuration` permite a los clientes descubrir endpoints (authorization, token, userinfo) y parámetros de configuración para integraciones dinámicas.

- JWKS y rotación de claves: el IdP publica sus claves públicas a través de JWKS. Los clientes deben manejar cache y rotación para evitar fallos en la verificación.

- UserInfo endpoint: endpoint protegido por access token que devuelve claims adicionales si no están presentes en el id_token.

- Controles de seguridad: `state` para prevenir CSRF, `nonce` para prevenir replay en front-channel, y PKCE para fortalecer clientes públicos.

Integrar correctamente OIDC implica validar tokens, minimizar claims, y pensar en privacidad (no retornar PII innecesaria). También planear la estrategia de claves y revocación del IdP.

## AUTHENTICATION

La autenticación es el proceso de verificar la identidad (quién es el usuario o cliente). En práctica se usan contraseñas, MFA y soluciones basadas en claves públicas (FIDO2). Buenas prácticas: almacenamiento seguro de contraseñas (bcrypt/argon2), limitar intentos de login, controles de recuperación de cuenta y detección de anomalías. Para clientes públicos preferir flujos OIDC + PKCE.

## AUTHORIZATION

La autorización determina qué puede hacer una identidad autenticada. Modelos comunes: RBAC (roles), ABAC (atributos) y políticas (ej: OPA). En APIs usar claims y scopes en tokens para expresar permisos y hacer enforcement en resource servers/gateways. Registrar decisiones de autorización para auditoría y revisar asignaciones periódicamente.

## IDP (Identity Provider)

Un Identity Provider centraliza la autenticación y gestión de identidades. Suele exponer OIDC/SAML, endpoints JWKS, APIs de gestión de usuarios y soporte para federación. Diseñar el IdP para alta disponibilidad, rotación de claves, aislamiento por tenant y aprovisionamiento automatizado (SCIM) para evitar sincronizaciones manuales.

## SSO

Single Sign-On (SSO) mejora la experiencia del usuario delegando autenticación al IdP. En entornos empresariales SAML o OIDC son opciones válidas; hoy OIDC suele ser preferido para nuevas aplicaciones. El logout único es complejo: diseñar para best-effort, documentar comportamiento y ofrecer mecanismos de limpieza de sesiones locales.

## SPRING SECURITY CONFIGURATION

Spring Security es el framework estándar para proteger aplicaciones Spring. Aspectos clave: configurar `SecurityFilterChain`, ordenar filtros (CORS/CSRF/autenticación), integrar validación JWT o introspección de token en resource servers y habilitar seguridad a nivel de método. Para servicios de alta carga, externalizar decisiones pesadas a gateways y cachear resultados de validaciones con TTLs apropiados.

## SPRING SECURITY ANNOTATIONS

Spring permite seguridad a nivel de método con `@PreAuthorize`, `@PostAuthorize`, `@Secured` y otros. Úsalas para expresar reglas cerca del código, pero evita dispersar lógica compleja; delega a un servicio de autorización o funciones reutilizables para mantener reglas testeables y mantenibles.

## RECURSO DOWNSTREAM

Los recursos downstream son APIs que tu servicio invoca. Asegura las llamadas minimizando scopes enviados, usando token exchange para adaptar audiencia, evaluando mTLS entre servicios, aplicando circuit breakers y monitorizando latencias. Exige siempre que el downstream valide tokens y scopes; no confíes en la validez por delegación.

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

## HTTPS & TLS

HTTP vs HTTPS: siempre prefiere HTTPS. HTTP transmite datos en texto claro; HTTPS usa TLS para cifrar la comunicación, protegiendo la confidencialidad e integridad de peticiones y respuestas. Cualquier API que maneje datos sensibles o flujos de autenticación debe requerir HTTPS.

Qué proporciona TLS:

- Cifrado: evita que atacantes lean el contenido en tránsito.
- Integridad: detecta alteraciones de los datos durante la transmisión.
- Autenticación: el servidor demuestra su identidad mediante certificados emitidos por CAs de confianza; el cliente verifica la cadena de certificados.

Guía práctica:

- Forzar TLS 1.2+ (preferir TLS 1.3) y deshabilitar cifrados y protocolos obsoletos.
- Usar HSTS (Strict-Transport-Security) para navegadores y reducir ataques de downgrading.
- Validar correctamente certificados (cadena, `hostname`, `notBefore`/`notAfter`) y considerar OCSP stapling para comprobaciones de revocación.
- Proteger cookies con HttpOnly, Secure y SameSite; preferir almacenamiento seguro para refresh tokens en vez de `localStorage`.
- Considerar mTLS para autenticación mutua entre servicios internos cuando se requiera verificación fuerte de identidad.
- Decidir dónde termina TLS: la terminación en balanceadores o gateways es común por rendimiento, pero si se requiere cifrado end-to-end es necesario re-establecer TLS hacia los backends o usar TLS passthrough.

Resumen: TLS es un control fundamental — implanta HTTPS en todas partes, automatiza la gestión de certificados y complétalo con controles de autenticación, logging y principio de menor privilegio.
