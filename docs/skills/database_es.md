# Descripciones de Habilidades: Database

Este documento proporciona explicaciones detalladas de habilidades clave en bases de datos, incluyendo frameworks de persistencia, optimización de SQL, construcción de consultas y patrones de diseño.

---

## Carga EAGER vs LAZY (EAGER vs LAZY)

**Descripción**
FetchType.EAGER carga las entidades relacionadas inmediatamente con la entidad padre. FetchType.LAZY difiere la carga hasta que la relación sea explícitamente accedida, reduciendo memoria y overhead inicial.

El problema N+1 ocurre cuando cargar una lista de entidades (1 consulta) dispara consultas adicionales para cada relación LAZY (N consultas). Estrategias como JOIN FETCH y EntityGraph son esenciales para evitar este cuello de botella.


**Puntos Clave:**

- Controla el tiempo de carga de datos para equilibrar rendimiento de consultas con uso de memoria y evitar trampas N+1.

---

## EntityManager y @Transactional (EntityManager, @transactional)

**Descripción**
El EntityManager es la interfaz central para operaciones JPA—persistir, buscar, fusionar y eliminar entidades. La anotación @Transactional define límites de transacción, asegurando operaciones atómicas y rollback automático en errores.

Entender la propagación de transacciones (REQUIRED vs REQUIRES_NEW) es crítico. El mal uso—especialmente en métodos privados o dentro de la misma clase—puede silenciosamente eludir la gestión de transacciones, causando corrupción de datos.


**Puntos Clave:**

- Gestiona el ciclo de vida de entidades y asegura consistencia transaccional mediante operaciones atómicas en la base de datos.

---

## Fundamentos de JDBC (JDBC Prepare statement, Result Set)

**Descripción**
JDBC es la API de acceso a base de datos de bajo nivel subyacente a JPA. PreparedStatement es superior a Statement por seguridad (prevención de SQL Injection) y rendimiento (cacheo del plan de ejecución).

ResultSet requiere cuidado en la gestión del cursor y recursos. El código moderno usa try-with-resources para garantizar que conexiones, sentencias y conjuntos de resultados siempre se cierren, previniendo fugas y agotamiento del pool.


**Puntos Clave:**

- Proporciona acceso seguro y de alto rendimiento a la base de datos con gestión rigurosa de recursos mediante sentencias preparadas.

---

## Caché de JPA (L1 y L2) (JPA cache)

**Descripción**
L1 (Primer Nivel) es obligatorio y vinculado a cada sesión de EntityManager. L2 (Segundo Nivel) es opcional y compartido entre sesiones, requiriendo proveedores externos como Ehcache o Redis.

El caché de consultas almacena resultados de JPQL/SQL. La gestión efectiva del caché—incluyendo políticas de expiración y estrategias de evicción—es vital para servicios Java escalables. Ten cuidado con riesgos de obsolescencia si procesos externos modifican la base de datos.


**Puntos Clave:**

- Minimiza viajes a la base de datos a través de caché multicapa mientras equilibra velocidad de datos con consistencia.

---

## Bloqueos y Transacciones (Locking/ Transaction)

**Descripción**
Bloqueo Optimista usa @Version para detectar modificaciones concurrentes solo en commit—altamente escalable para aplicaciones web. Bloqueo Pesimista bloquea filas inmediatamente, previniendo otro acceso hasta completar la transacción, más seguro pero más lento y propenso a deadlocks.

Los niveles de aislamiento (READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE) controlan el comportamiento concurrente. Elegir la estrategia correcta es un equilibrio delicado entre integridad de datos y responsividad del sistema.


**Puntos Clave:**

- Protege la integridad de datos en entornos concurrentes a través de estrategias optimista o pesimista y gestión de niveles de aislamiento.

---

## Constructores de Consultas JDBC (JDBC query builders (jOOQ, MyBatys))

**Descripción**
MyBatis permite mapear SQL directamente a objetos Java, proporcionando control sobre ejecución de consultas. jOOQ es un DSL SQL type-safe que genera código desde tu esquema de base de datos, previniendo errores de sintaxis en compilación.

Estas herramientas habilitan construcción de consultas dinámica y componible—ideal para filtrado complejo, reportes y optimizaciones específicas de base de datos que la abstracción de JPA no puede expresar.


**Puntos Clave:**

- Habilita construcción de consultas dinámica y type-safe con control total sobre generación de SQL y características específicas de base de datos.

---

## Consultas Nativas vs JPQL (native query vs JPQL)

**Descripción**
JPQL opera sobre entidades y atributos, proporcionando portabilidad de base de datos. Las Consultas Nativas usan SQL puro para características específicas del motor (funciones de ventana, hints de Oracle) al costo de portabilidad.

Las Consultas Nativas eluden validación de JPA y requieren mapeo explícito de resultados. JPQL se recomienda para operaciones CRUD estándar; reserva consultas nativas para escenarios performance-críticos donde portabilidad no es requerida.


**Puntos Clave:**

- Equilibra portabilidad de base de datos (JPQL) contra potencia y rendimiento (SQL nativo) basado en requisitos de la aplicación.

---

## Relaciones de Entidad JPA (JPA entity, @manytomany, @manytoone, @onetomany)

**Descripción**
Mapeando relaciones de negocio: @ManyToOne (muchos pedidos a un cliente), @OneToMany (un cliente a muchos pedidos), @ManyToMany (muchos estudiantes a muchos cursos vía tabla de unión).

Define propiedad con "mappedBy" para evitar metadatos redundantes. Estrategias avanzadas incluyen herencia (SINGLE_TABLE vs JOINED) y eliminación de huérfanos para limpieza automática. Las relaciones bidireccionales aumentan complejidad; úsalas solo si es necesario.


**Puntos Clave:**

- Modela dominios complejos en esquemas relacionales usando mapeo estandarizado mientras mantiene consistencia de datos.

---

## Constructores de Consultas JPA (JPA query builders (QueryDSL, Criteria Query, Specification))

**Descripción**
Criteria API y QueryDSL construyen consultas dinámicamente de forma programática, detectando errores de sintaxis en compilación. Las Q-Classes generadas de QueryDSL proporcionan soporte superior del IDE y legibilidad.

Las Especificaciones de Spring Data permiten predicados de filtro composables y reutilizables combinados con where(), and() y or(). Este enfoque funcional es ideal para páginas de búsqueda con muchos criterios opcionales.


**Puntos Clave:**

- Crea consultas dinámicas y type-safe que reducen errores en runtime y facilitan el mantenimiento de lógica de consulta compleja.

---

## Optimización de Consultas e Índices (Query Optimization and indexes)

**Descripción**
Los índices son estructuras de datos especializadas que aceleran búsquedas—índices B-Tree para consultas de rango y ordenamiento, índices Hash solo para comprobaciones de igualdad exacta.

Usa EXPLAIN para visualizar planes de ejecución. Los Índices de Cobertura (conteniendo todas las columnas para una consulta) permiten al optimizador obtener datos directamente del índice sin acceder a la tabla. La fragmentación de índices (por inserciones/eliminaciones) degrada rendimiento; REINDEX lo restaura.


**Puntos Clave:**

- Optimiza recuperación de datos a través de indexación estratégica y análisis de planes de ejecución, equilibrando lecturas rápidas contra rendimiento de escritura.

---

## Consultas SQL (Queries (SELECT, FROM, ORDER BY, LIMIT, JOIN, GROUP BY, MAX, MIN, COUNT, SUM))

**Descripción**
WHERE filtra filas antes de agrupar; HAVING filtra grupos después de agregación. INNER JOIN devuelve solo filas coincidentes; LEFT JOIN incluye filas no coincidentes de la tabla izquierda como NULLs.

Window Functions (OVER, ROW_NUMBER) calculan valores a través de filas relacionadas sin agrupar. Common Table Expressions (CTEs) definen conjuntos de resultados reutilizables; CTEs recursivos recorren datos jerárquicos como árboles organizacionales.


**Puntos Clave:**

- Construye consultas eficientes de recuperación de datos usando joins, agregaciones y window functions para necesidades analíticas complejas.

---

## PL/SQL

**Descripción**
PL/SQL (la extensión procedimental de Oracle) habilita procedimientos almacenados, funciones y paquetes con variables, condicionales, bucles y manejo de excepciones dentro de la base de datos.

Las operaciones BULK (FORALL, BULK COLLECT) procesan múltiples filas en un solo cambio de contexto entre PL/SQL y SQL, mejorando drásticamente el rendimiento sobre procesamiento fila por fila. Los Paquetes proporcionan encapsulamiento, modularidad y caché de estado.


**Puntos Clave:**

- Implementa lógica de negocio del lado servidor con capacidades procedimentales, mejorando rendimiento y reduciendo viajes de red.

---

## Normalización y Restricciones (Normalization and Constraints)

**Descripción**
Las Primary Keys identifican filas de forma única. Las Foreign Keys cumplen integridad referencial—previniendo eliminación de filas padre referenciadas. La Normalización reduce redundancia; la Tercera Forma Normal (3NF) es el estándar para sistemas transaccionales.

La Desnormalización (duplicación controlada) es aceptable en sistemas analíticos (Data Warehouses) donde velocidad de lectura supera rendimiento de escritura. Las Check Constraints proporcionan la línea de defensa final y más segura contra datos inválidos a nivel de base de datos.


**Puntos Clave:**

- Asegura la integridad de datos y reduce redundancia a través de diseño estructurado y cumplimiento riguroso de restricciones.

---

## Diseño de Bases de Datos (Database Design)

**Descripción**
Los diagramas Entidad-Relación (ER) visualizan entidades de negocio y relaciones antes de la implementación física. Las relaciones Many-to-Many usan tablas de unión. Las Claves Compuestas (múltiples columnas) aseguran unicidad cuando columnas individuales no son suficientes.

El Diseño Lógico es agnóstico de tecnología; el Diseño Físico lo adapta a una base de datos específica (Oracle, PostgreSQL) con tipos concretos e índices. Los sistemas SaaS multi-tenant eligen entre base de datos por cliente (aislamiento), esquema por cliente o tabla compartida con TenantID (máxima escalabilidad).


**Puntos Clave:**

- Crea esquemas escalables y consistentes que equilibran requisitos de negocio contra capacidades de base de datos y restricciones de distribución.

---

## Clusters, Federación y Datamarts (Clusters, Federation and Datamarts)

**Descripción**
Un Cluster de Base de Datos agrupa servidores para alta disponibilidad y escalabilidad. Alta Disponibilidad (HA) asegura uptime a pesar de fallos de hardware. Data Warehouse integra datos de toda la empresa; Data Mart lo subestructura por dominio (Ventas, Marketing).

La Federación de Bases de Datos permite consultar múltiples fuentes heterogéneas (MySQL, Oracle, CSV) como una base de datos lógica. La Replicación sincroniza datos: replicación síncrona es más segura pero lenta; replicación asíncrona es rápida pero riesga pérdida de datos en fallo. El Sharding particiona datos horizontalmente entre servidores para manejar volúmenes masivos.


**Puntos Clave:**

- Habilita alta disponibilidad, escalabilidad y federación de datos a través de estrategias de clustering y distribución.

---

## DDL (Data Types, CREATE, ALTER, INSERT, UPDATE, DELETE, TRUNCATE)

**Descripción**
Las sentencias DDL (CREATE, ALTER, INSERT, UPDATE, DELETE, TRUNCATE) definen y modifican la estructura de base de datos. DELETE es DML (elimina filas individualmente, permite WHERE, genera logs). TRUNCATE es DDL (vacía tabla instantáneamente, sin WHERE, resetea contadores de identidad).

Ejecutar ALTER TABLE en millones de filas arriesga Exclusive Locks largos causando downtime. SELECT * se desaconseja en producción (columnas innecesarias, índices rotos, fragilidad a cambios de esquema). Las Materialized Views almacenan resultados de consulta físicamente en disco para respuestas instantáneas a consultas complejas con refrescas programados.


**Puntos Clave:**

- Proporciona operaciones DDL fundamentales para creación de esquema y manipulación de datos, con implicaciones críticas de rendimiento y bloqueo.

---
