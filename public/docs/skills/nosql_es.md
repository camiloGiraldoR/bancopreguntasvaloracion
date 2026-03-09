# Descripciones de Habilidades: No SQL

Este documento cubre el paradigma NoSQL, explorando diferentes modelos de datos, principios de sistemas distribuidos como el teorema CAP y las compensaciones entre consistencia y disponibilidad.

---

## 1. Fundamentos de NoSQL (No SQL)
**Descripción**
NoSQL (Not Only SQL) representa un cambio alejándose de la estructura tabular rígida de las bases de datos relacionales. Mientras que SQL se basa en esquemas fijos y JOINs complejos, NoSQL ofrece flexibilidad, permitiendo que los datos se almacenen en varios formatos como Documentos, pares Clave-Valor, Grafos o Columnas Anchas.

El motor principal de NoSQL es la escalabilidad. La mayoría de las bases de datos NoSQL están diseñadas para el "Escalado Horizontal", lo que significa que pueden distribuir fácilmente los datos a través de cientos de servidores. Esto las hace ideales para manejar volúmenes masivos de datos no estructurados o flujos de alta velocidad que abrumarían a los sistemas SQL tradicionales.

Sin embargo, esta flexibilidad tiene sus costos. Los motores NoSQL a menudo sacrifican el cumplimiento total de ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad) en favor del rendimiento y la disponibilidad. Elegir NoSQL es una decisión estratégica basada en las necesidades específicas de la forma de los datos y su patrón de crecimiento.

**Puntos Clave**
*   Proporciona una alternativa flexible y altamente escalable a las bases de datos relacionales, optimizando el crecimiento horizontal y diversos formatos de datos a costa de una consistencia rígida.

**Ejemplo**
Un perfil de usuario en una red social con campos que cambian constantemente (ej: nuevos intereses, diferentes redes sociales vinculadas). En SQL tendrías muchas columnas nulas o tablas puente; en un NoSQL de documentos como **MongoDB**, guardas un JSON flexible por cada usuario.

---

## 2. Teorema CAP (CAP Theorem)
**Descripción**
El Teorema CAP es un principio fundamental de los sistemas distribuidos. Establece que un almacén de datos distribuido solo puede proporcionar simultáneamente dos de tres garantías: Consistencia (Consistency - cada lectura recibe la escritura más reciente), Disponibilidad (Availability - cada solicitud recibe una respuesta) y Tolerancia a Particiones (Partition Tolerance - el sistema sigue operando a pesar de fallos de red).

Dado que las particiones de red son inevitables en entornos distribuidos, las bases de datos NoSQL deben elegir entre ser "CP" (Consistentes y Tolerantes a Particiones) o "AP" (Disponibles y Tolerantes a Particiones). Esta elección define cómo se comporta el sistema durante una crisis de red.

Por ejemplo, un sistema "CP" podría bloquear las escrituras hasta que se arregle la red para asegurar que los datos nunca estén desincronizados, mientras que un sistema "AP" seguirá aceptando datos pero podría devolver versiones antiguas a algunos usuarios temporalmente. Comprender esta elección es crítico para diseñar aplicaciones globales resilientes.

**Puntos Clave**
*   Define las compensaciones inherentes en el almacenamiento de datos distribuido, forzando una elección estratégica entre la consistencia perfecta de los datos y la disponibilidad constante del sistema durante las interrupciones de red.

**Ejemplo**
*   **HBase (CP)**: Prefiere que el sistema no responda a que devuelva un dato incorrecto o desactualizado.
*   **Cassandra (AP)**: Prefiere responder algo (disponibilidad), aunque sea un dato de hace 1 segundo, antes que dar un error al usuario.

---

## 3. Caché y Redis (Caching and Redis)
**Descripción**
El almacenamiento en caché es la práctica de guardar datos accedidos con frecuencia en memoria de alta velocidad (RAM) para evitar lecturas costosas de disco o recálculos complejos. Redis es el líder de la industria para esto, funcionando como un almacén de estructuras de datos en memoria con tiempos de respuesta de sub-milisegundos.

Usar Redis como una "Caché Lateral" puede mejorar drásticamente el rendimiento de la aplicación. En lugar de consultar una base de datos lenta por el perfil de un usuario cada vez que actualiza la página, la aplicación verifica primero en Redis. Esto no solo acelera la experiencia del usuario, sino que también reduce la carga en la base de datos principal.

El uso avanzado de Redis incluye estructuras de datos como Hashes, Listas y Conjuntos Ordenados, que pueden usarse para implementar funciones como tablas de clasificación en tiempo real, gestión de sesiones y limitación de tasa (rate limiting). Es una herramienta versátil que cierra la brecha entre el almacenamiento estático y el procesamiento en tiempo real.

**Puntos Clave**
*   Acelera los tiempos de respuesta de la aplicación al descargar las solicitudes de datos frecuentes a un almacenamiento en memoria de alta velocidad, permitiendo al mismo tiempo funciones complejas en tiempo real.

**Ejemplo**
```java
// Patrón Cache-Aside en Java con Redis
String perfilJson = redis.get("user:123");
if (perfilJson == null) {
    Perfil p = db.findUser(123); // Base de datos lenta
    redis.setex("user:123", 3600, toJson(p)); // Guardar en caché 1 hora
    return p;
}
return fromJson(perfilJson); // Retorno instantáneo desde RAM
```

---

## 4. Consistencia Eventual (Eventual Consistency)
**Descripción**
La Consistencia Eventual es un modelo de consistencia utilizado en muchas bases de datos NoSQL distribuidas (como Cassandra o DynamoDB). Garantiza que, si no se realizan nuevas actualizaciones a un elemento de datos, eventualmente todos los accesos a ese elemento devolverán el último valor actualizado.

Este modelo es una pieza central de los sistemas que priorizan la disponibilidad. En una aplicación global, un usuario en Europa podría actualizar su perfil y, durante unos milisegundos, un usuario en Asia podría seguir viendo la versión antigua mientras la actualización se propaga por todo el mundo.

Aunque suena arriesgado, la consistencia eventual es perfectamente aceptable para muchos escenarios como los "me gusta" de las redes sociales, los comentarios de productos o las actualizaciones de perfil. Solo los sistemas que requieren precisión absoluta e inmediata —como las transferencias bancarias— deberían evitar este modelo en favor de la "Consistencia Fuerte".

**Puntos Clave**
*   Prioriza la alta disponibilidad del sistema y la baja latencia al permitir una divergencia temporal de datos que se sincroniza automáticamente con el tiempo a través de los nodos distribuidos.

**Ejemplo**
Cuando publicas un comentario en un video de YouTube, puede que tú lo veas al instante, pero tu amigo en otro país tarde 2 segundos en verlo aparecer. Esa es la **Consistencia Eventual** en acción para poder escalar a miles de millones de usuarios.

---

## 5. Cuándo NO usar NoSQL
**Descripción**
A pesar de su popularidad, NoSQL no es una "bala de plata". Debe evitarse cuando los datos son altamente relacionales y requieren consultas complejas de múltiples tablas que serían difíciles de modelar sin JOINs. Las bases de datos relacionales siguen siendo superiores para datos estructurados e interconectados.

Otra "bandera roja" para NoSQL es el requisito de transacciones ACID fuertes a través de múltiples registros. Si tu lógica de negocio depende de actualizaciones de "todo o nada" entre diferentes entidades (como una pista de auditoría financiera), una base de datos SQL tradicional es más segura y fácil de implementar.

Finalmente, si el volumen de datos del proyecto es pequeño y predecible, la complejidad operativa de gestionar un clúster NoSQL distribuido podría superar los beneficios. En muchos casos, una instancia de PostgreSQL o MySQL bien indexada es más que suficiente y mucho más sencilla de mantener.

**Puntos Clave**
*   Identifica escenarios donde la complejidad de NoSQL es innecesaria o riesgosa, favoreciendo los sistemas relacionales para joins complejos, integridad transaccional estricta y escalas de datos predecibles.

**Ejemplo**
Un sistema de contabilidad bancaria donde cada céntimo debe cuadrar entre múltiples cuentas al mismo tiempo. Aquí la **Consistencia Fuerte** y las **Transacciones SQL** son innegociables para evitar errores financieros.
