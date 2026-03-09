# Descripciones de Habilidades: REST (Representational State Transfer)

Este documento cubre los principios de la arquitectura RESTful, incluyendo el diseño de APIs, seguridad, métodos de protocolo y mejores prácticas para construir servicios web escalables.

---

## 1. Versionamiento de APIs (API Versioning)
**Descripción**
El versionamiento de APIs es la práctica de gestionar los cambios en una API de forma que no se rompan las integraciones existentes de los clientes. A medida que los requisitos de negocio evolucionan, la API debe cambiar, pero los clientes antiguos pueden no estar listos para actualizarse de inmediato.

Las estrategias comunes incluyen el versionamiento en la URL (ej., `/v1/usuarios`), que es fácil de leer y cachear, o el uso de cabeceras (headers) personalizadas. Otro método avanzado es la "Negociación de Contenido" (Content Negotiation), donde la versión se especifica en la cabecera `Accept`, manteniendo limpia la estructura de la URL.

El Versionamiento Semántico (SemVer) suele aplicarse a las APIs para comunicar la naturaleza de los cambios. Un incremento de la versión MAYOR indica cambios que rompen la compatibilidad, mientras que las versiones MENOR y PARCHE indican mejoras o correcciones compatibles con versiones anteriores.

**Puntos Clave**
*   Asegura la estabilidad de la API a largo plazo y la compatibilidad hacia atrás mediante estrategias de versionamiento estructuradas y una comunicación clara de los cambios en el contrato.

**Ejemplo**
Un cambio en el nombre de un campo de `primer_nombre` a `nombre_completo`. Para no romper las apps móviles viejas, mantienes la versión antigua en `/api/v1/usuarios` y lanzas el cambio en `/api/v2/usuarios`.

---

## 2. Diseño de APIs - Principios RESTful (API Design)
**Descripción**
Una API RESTful sigue restricciones arquitectónicas específicas, siendo la más importante que está "Basada en Recursos". Cada entidad (Usuario, Pedido) se identifica mediante un URI único, y las interacciones se realizan utilizando métodos HTTP estándar.

Otro principio clave es la "Sin Estado" (Statelessness), lo que significa que cada solicitud de un cliente debe contener toda la información necesaria para entenderla y procesarla. El servidor no almacena ningún contexto del cliente entre solicitudes, lo que mejora enormemente la escalabilidad.

HATEOAS (Hypermedia as the Engine of Application State) es una característica avanzada de REST donde la respuesta de la API incluye enlaces a recursos relacionados. Esto hace que la API sea "autodescubrible", permitiendo que los clientes naveguen por el sistema de forma dinámica.

**Puntos Clave**
*   Construye interfaces escalables e intuitivas mediante la comunicación orientada a recursos, sin estado y con navegación impulsada por hipermedia.

**Ejemplo**
Al consultar un pedido `/api/pedidos/101`, la respuesta JSON incluye un campo `_links` con la URL para cancelar el pedido `/api/pedidos/101/cancelar` y otra para ver el cliente `/api/clientes/5`. El cliente de la API no necesita "adivinar" las URLs.

---

## 3. CORS (CORS)
**Descripción**
CORS es un mecanismo de seguridad basado en el navegador que restringe que las páginas web realicen solicitudes a un dominio diferente al que sirvió la página. Sin CORS, cualquier sitio malicioso podría potencialmente realizar solicitudes a tu API en nombre del usuario.

Cuando un navegador detecta una solicitud "compleja" (como un POST con un cuerpo JSON), primero envía una solicitud "Preflight" (OPTIONS) para verificar si el servidor permite el origen, los métodos y las cabeceras. El servidor debe responder con las cabeceras `Access-Control-Allow-Origin` adecuadas.

Configurar `Access-Control-Allow-Origin: *` es un error común pero peligroso para APIs que usan cookies o datos sensibles, ya que permite que cualquier sitio web interactúe con el servicio. La gestión adecuada de CORS requiere una lista blanca (whitelist) estricta de dominios de confianza.

**Puntos Clave**
*   Protege las APIs del acceso no autorizado entre dominios mediante la validación de origen forzada por el navegador y cabeceras estrictas del lado del servidor.

**Ejemplo**
Tu frontend vive en `https://mi-app.com` y tu API en `https://api.mi-app.com`. Debes configurar la API para que acepte explícitamente el origen `https://mi-app.com`, de lo contrario, el navegador bloqueará la respuesta por seguridad.

---

## 4. Llamadas a la API (API Calls (Headers, clients))
**Descripción**
La interacción con la API depende en gran medida de las cabeceras HTTP para transmitir metadatos. `Content-Type` indica al servidor el formato de los datos que se envían (ej., `application/json`), mientras que la cabecera `Authorization` transporta las credenciales de seguridad como tokens JWT o Basic Auth.

Los desarrolladores utilizan varios clientes para probar e integrar APIs. Herramientas como Postman o Insomnia son excelentes para pruebas manuales, mientras que librerías como Fetch, Axios (JavaScript) o WebClient de Spring (Java) se utilizan para el acceso programático.

En Java, `WebClient` ha reemplazado en gran medida al antiguo `RestTemplate` porque es no bloqueante y reactivo. El uso de interceptores en estos clientes permite centralizar la lógica, como adjuntar tokens automáticamente o registrar (log) todas las solicitudes salientes.

**Puntos Clave**
*   Gestiona la comunicación con la API a través de cabeceras de metadatos estandarizadas y clientes especializados, aprovechando herramientas reactivas y no bloqueantes para arquitecturas modernas.

**Ejemplo**
```java
// Usando WebClient para llamar a una API protegida
webClient.get()
    .uri("/api/perfil")
    .header("Authorization", "Bearer " + token)
    .retrieve()
    .bodyToMono(Perfil.class);
```

---

## 5. Cookies y Sesiones (Cookies Session)
**Descripción**
Tradicionalmente, las aplicaciones web usaban sesiones del lado del servidor y cookies para rastrear a los usuarios. El servidor almacena un ID de sesión en una cookie y, para cada solicitud, busca los datos del usuario en su propia memoria. Esto es "Con Estado" (Stateful) y puede ser difícil de escalar horizontalmente.

Las APIs modernas prefieren la autenticación "Sin Estado" (Stateless) usando Tokens (JWT). El token en sí contiene todos los datos necesarios del usuario, por lo que el servidor no necesita almacenar nada. Esto facilita mucho el escalado entre múltiples servidores o regiones.

Al usar cookies, los atributos de seguridad son vitales. `HttpOnly` impide que JavaScript acceda a la cookie (mitigando ataques XSS), mientras que `Secure` asegura que solo se envíe por HTTPS. Los atributos `SameSite` ayudan a prevenir el CSRF (Falsificación de Solicitud en Sitios Cruzados).

**Puntos Clave**
*   Evolución de la gestión de estado heredada y dependiente del servidor hacia arquitecturas modernas sin estado basadas en tokens para mejorar la escalabilidad y la seguridad.

**Ejemplo**
En una App de banca móvil, usas un **JWT** que expira en 15 minutos. El servidor no guarda "quién está conectado", simplemente valida la firma del token en cada petición. Si necesitas escalar a 10 servidores, todos pueden validar el token sin compartir base de datos de sesiones.

---

## 6. Construcción de APIs (API Construction)
**Descripción**
Una API bien construida debe ser intuitiva y seguir patrones lógicos. Los endpoints deben usar sustantivos en plural para los recursos (ej., `/productos`) en lugar de verbos (ej., `/obtenerTodosLosProductos`). Esto mantiene la estructura de la URL consistente y fácil de predecir.

Usar la parte correcta de la URL para el propósito correcto es clave: las Variables de Ruta (Path Variables) deben usarse para identificar un recurso específico (ej., `/usuarios/123`), mientras que los Parámetros de Consulta (Query Parameters) son para filtrar, ordenar o paginar (ej., `/usuarios?edad=30`).

La documentación también es parte de la "construcción". Herramientas como OpenAPI (Swagger) proporcionan una forma estandarizada de describir la API, permitiendo la generación automática de documentación interactiva e incluso librerías de cliente para diferentes lenguajes de programación.

**Puntos Clave**
*   Define puntos de acceso intuitivos y consistentes a través de estructuras de URL basadas en recursos y documentación estandarizada para una mejor experiencia del desarrollador.

**Ejemplo**
*   **Bien**: `GET /pedidos/45/articulos` (Busca artículos del pedido 45).
*   **Mal**: `GET /verArticulosPedido?id=45` (Usa verbos y parámetros de consulta para identificación).

---

## 7. Métodos HTTP CRUD (CRUD vs HTTP Methods)
**Descripción**
Los métodos HTTP definen la acción a realizar sobre un recurso. GET es para leer, POST para crear, PUT para reemplazar, PATCH para actualizaciones parciales y DELETE para eliminar. Estos se mapean estrechamente con las operaciones CRUD estándar.

Comprender la "Seguridad" e "Idempotencia" es avanzado pero crítico. GET y HEAD son "Seguros" porque no cambian el estado. PUT y DELETE son "Idempotentes" porque llamarlos varias veces con los mismos datos conduce al mismo estado final en el servidor.

POST *no* es necesariamente idempotente; llamarlo dos veces podría crear dos registros idénticos. Reconocer estas propiedades ayuda a diseñar sistemas fiables, especialmente al implementar lógica de "Reintento" (Retry) en el lado del cliente durante fallos de red.

**Puntos Clave**
*   Estandariza la manipulación de recursos mediante verbos HTTP bien definidos, distinguiendo entre operaciones seguras e idempotentes para construir APIs fiables y predecibles.

**Ejemplo**
Si el internet falla al enviar un **PUT** (actualizar perfil), el cliente puede reintentar con seguridad porque el resultado final será el mismo. Si falla al enviar un **POST** (crear transferencia bancaria), reintentar a ciegas podría duplicar el envío de dinero.

---

## 8. Certificados Digitales (Digital Certificates)
**Descripción**
La seguridad en tránsito es obligatoria. HTTPS (HTTP sobre SSL/TLS) asegura que todos los datos intercambiados entre el cliente y el servidor estén cifrados y protegidos contra ataques de "Hombre en el Medio" (Man-in-the-Middle).

El proceso comienza con un "Saludo" (Handshake) donde el servidor presenta un Certificado Digital para probar su identidad. Este certificado contiene una Clave Pública utilizada por el cliente para cifrar los datos, mientras que el servidor utiliza su Clave Privada secreta para descifrarlos.

Para servicios internos (Microservicios), a menudo se utiliza TLS Mutuo (mTLS). Esto requiere que *tanto* el cliente como el servidor presenten certificados, asegurando que solo los componentes de confianza puedan comunicarse entre sí dentro de la red privada.

**Puntos Clave**
*   Cifra y autentica la comunicación mediante certificados y claves estandarizados, garantizando la privacidad e integridad de los datos a través de la red.

**Ejemplo**
Cuando ves el candado verde en el navegador al entrar a tu banco, significa que hay un certificado válido de **Let's Encrypt** o **DigiCert** cifrando tu contraseña para que nadie en el Wi-Fi público pueda verla.

---

## 9. Códigos de Respuesta HTTP (HTTP Response Codes)
**Descripción**
Los códigos de respuesta son la forma estandarizada de un servidor para comunicar el resultado de una solicitud. Se agrupan en rangos: 2xx para éxito, 3xx para redirección, 4xx para errores del cliente y 5xx para errores del servidor.

Los códigos comunes incluyen 200 OK (Éxito genérico), 201 Created (Éxito tras POST), 400 Bad Request (Entrada inválida), 401 Unauthorized (Falta inicio de sesión), 403 Forbidden (Falta de permisos) y 500 Internal Error (Fallo del servidor).

Usar el código más específico posible es vital para el manejo de errores. Por ejemplo, 409 Conflict es perfecto para registros duplicados, mientras que 429 Too Many Requests informa al cliente que ha excedido su límite de velocidad y debe reducirla.

**Puntos Clave**
*   Comunica los resultados de las solicitudes mediante un sistema numérico estandarizado, permitiendo un manejo de errores automatizado y una validación de éxito consistente.

**Ejemplo**
Si intentas crear un usuario con un email que ya existe, la API devuelve un **409 Conflict**. El frontend lee este código y muestra el mensaje específico "El correo ya está en uso" en lugar de un error genérico.
