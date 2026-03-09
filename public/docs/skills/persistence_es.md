# Descripciones de Habilidades: Persistencia en Java

Este documento cubre la API de Persistencia de Java (JPA), Hibernate, JDBC y las diversas estrategias para gestionar los ciclos de vida de los datos y las transacciones en aplicaciones Java.

---

## 1. Carga EAGER vs LAZY (EAGER vs LAZY)
**Descripción**
Las estrategias de carga (fetching) en JPA definen cuándo deben cargarse las entidades relacionadas desde la base de datos. La carga EAGER carga todo inmediatamente, lo cual es conveniente pero puede causar problemas de rendimiento si se recuperan grandes grafos de datos innecesarios.

La carga LAZY (perezosa) es la opción preferida por defecto; carga las entidades relacionadas solo cuando se accede a ellas por primera vez. Esto mantiene la consulta inicial rápida y ligera. Los desarrolladores profesionales deben entender estos valores por defecto (ej. @OneToMany es LAZY, @ManyToOne es EAGER) para evitar cuellos de botella inesperados.

Un error común es el problema de las "N+1 consultas", donde una sola consulta para una lista de entidades dispara N consultas adicionales para sus relaciones LAZY. Estrategias como "JOIN FETCH" o el uso de EntityGraphs son esenciales para optimizar estos escenarios y asegurar una recuperación de datos eficiente.

**Puntos Clave**
*   Controla el tiempo de carga de los datos para equilibrar la velocidad de la consulta inicial con el uso de memoria del sistema, evitando trampas de rendimiento comunes como las consultas N+1.

**Ejemplo**
```java
// Definición de relación perezosa
@OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
private List<Pedido> pedidos;

// Uso de JOIN FETCH para evitar N+1 en una consulta específica
@Query("SELECT u FROM Usuario u JOIN FETCH u.pedidos WHERE u.id = :id")
Usuario findUsuarioConPedidos(Long id);
```

---

## 2. EntityManager y @Transactional (EntityManager, @transactional)
**Descripción**
El EntityManager es el corazón de JPA, actuando como la interfaz entre la aplicación y el contexto de persistencia. Gestiona el ciclo de vida de las entidades, permitiendo a los desarrolladores persistir, buscar, fusionar y eliminar datos a través de una API estandarizada.

La anotación @Transactional simplifica la gestión de la base de datos definiendo los límites de una transacción. Asegura que las operaciones sean atómicas: si el método tiene éxito, los cambios se confirman (commit), pero si ocurre un error, todo el conjunto de cambios se deshace (rollback) para mantener la consistencia de los datos.

Comprender la propagación de transacciones (como REQUIRED vs REQUIRES_NEW) es crítico para gestionar flujos de negocio complejos. El uso inadecuado de estas anotaciones, especialmente en métodos privados o dentro de la misma clase, puede hacer que las transacciones sean ignoradas, causando una corrupción silenciosa de datos.

**Puntos Clave**
*   Gestiona el ciclo de vida de las entidades y la consistencia transaccional, asegurando operaciones atómicas y transiciones de estado fiables dentro de la base de datos.

**Ejemplo**
```java
@Service
public class MiServicio {
    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void guardarProcesoComplejo(Entidad e) {
        em.persist(e); // El EntityManager gestiona la entidad
        // Si algo falla aquí, @Transactional hará rollback automático
    }
}
```

---

## 3. Fundamentos de JDBC (JDBC Prepare statement, Result Set)
**Descripción**
JDBC (Java Database Connectivity) es la API de bajo nivel sobre la cual se construye JPA. Aunque los ORM como Hibernate son más comunes, entender JDBC sigue siendo vital para escenarios de alto rendimiento o cuando se usan sistemas legados donde se requiere un control directo de SQL.

PreparedStatement es el estándar de oro para ejecutar SQL. No solo mejora el rendimiento mediante la precompilación, sino que también proporciona la defensa principal contra los ataques de Inyección SQL al manejar de forma segura los parámetros de entrada.

Manejar un ResultSet requiere una gestión cuidadosa del cursor de la base de datos y de los recursos. Los desarrolladores modernos utilizan "try-with-resources" para asegurar que las conexiones, sentencias y conjuntos de resultados se cierren siempre correctamente, evitando fugas de memoria y el agotamiento del pool de conexiones.

**Puntos Clave**
*   Proporciona acceso a la base de datos a bajo nivel y de alto rendimiento, con un enfoque en la seguridad mediante sentencias preparadas y una gestión rigurosa de recursos.

**Ejemplo**
```java
String sql = "SELECT nombre FROM usuarios WHERE id = ?";
try (Connection conn = dataSource.getConnection();
     PreparedStatement pstmt = conn.prepareStatement(sql)) {
    
    pstmt.setInt(1, 101); // Parámetro seguro contra SQL Injection
    try (ResultSet rs = pstmt.executeQuery()) {
        if (rs.next()) {
            System.out.println(rs.getString("nombre"));
        }
    }
} catch (SQLException e) { /* manejar error */ }
```

---

## 4. Caché de JPA (JPA cache)
**Descripción**
JPA utiliza el almacenamiento en caché para reducir el número de impactos directos en la base de datos. El Caché de Nivel 1 (L1) es obligatorio y está ligado a la sesión del EntityManager, asegurando que la misma entidad solicitada dos veces en la misma transacción devuelva la misma instancia.

El Caché de Nivel 2 (L2) es opcional y se comparte entre todas las sesiones de la aplicación. Requiere un proveedor externo como Ehcache o Redis. El caché L2 es potente para aplicaciones con muchas lecturas, pero introduce riesgos de datos "obsoletos" si la base de datos se modifica externamente.

La caché de consultas es una forma especializada de caché L2 que almacena los resultados de consultas JPQL específicas. Gestionar eficazmente estas capas —incluyendo políticas de expiración y estrategias de desalojo— es la clave para construir servicios Java rápidos y escalables.

**Puntos Clave**
*   Mejora el rendimiento de la aplicación minimizando los viajes de ida y vuelta a la base de datos mediante una arquitectura de caché multicapa que equilibra la velocidad con la consistencia.

**Ejemplo**
```java
// Anotación para habilitar caché L2 en una entidad (Hibernate)
@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Producto { ... }
```

---

## 5. Bloqueos y Transacciones (Locking/ Transaction)
**Descripción**
El control de concurrencia asegura que múltiples usuarios puedan acceder a los mismos datos sin corromperlos. El Bloqueo Optimista (usando @Version) asume que los conflictos son raros, verificando cambios solo en el momento del commit, lo cual es altamente escalable para la mayoría de las aplicaciones web.

El Bloqueo Pesimista es más defensivo, bloqueando la fila de la base de datos tan pronto como se lee. Esto evita que otros incluso lean los datos hasta que la transacción se complete. Aunque es más seguro para datos con mucha contienda, puede reducir significativamente el rendimiento del sistema y causar interbloqueos (deadlocks).

Los desarrolladores también deben entender los niveles de aislamiento de la base de datos (como READ_COMMITTED vs REPEATABLE_READ) y su impacto en el rendimiento. Elegir la estrategia de bloqueo adecuada es un equilibrio delicado entre la integridad de los datos y la capacidad de respuesta del sistema.

**Puntos Clave**
*   Protege la integridad de los datos en entornos concurrentes gestionando los conflictos de acceso a través de estrategias de bloqueo optimista o pesimista y el aislamiento de transacciones.

**Ejemplo**
```java
// Bloqueo Optimista con versión
@Entity
public class Inventario {
    @Id private Long id;
    @Version private Long version; // Controla cambios concurrentes
}

// Bloqueo Pesimista en una consulta
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT i FROM Inventario i WHERE i.id = :id")
Inventario findAndLockById(Long id);
```

---

## 6. Constructores de Consultas JDBC (JDBC query builders (jOOQ, MyBatys))
**Descripción**
Más allá de JPQL básico, los desarrolladores usan herramientas como QueryDSL, Criteria API o jOOQ para construir consultas dinámicas y seguras en cuanto a tipos. Estos constructores evitan errores de sintaxis en cadenas y hacen que el filtrado complejo sea mucho más fácil de mantener y probar.

Las Especificaciones (Specifications) y Predicados permiten fragmentos reutilizables de lógica de consulta que se pueden combinar sobre la marcha. Este enfoque "funcional" para las consultas es excelente para páginas de búsqueda donde los usuarios pueden filtrar por muchos criterios opcionales diferentes.

Las proyecciones son igualmente importantes; permiten recuperar solo subconjuntos de datos en DTOs en lugar de entidades completas. Esto reduce la cantidad de datos transferidos desde la base de datos y la memoria consumida por la aplicación, lo cual es vital para informes de alto rendimiento.

**Puntos Clave**
*   Permite la creación de consultas dinámicas y seguras, optimizando la transferencia de datos mediante constructores estandarizados y la proyección selectiva de información.

**Ejemplo**
```java
// Proyección a un DTO mediante constructor en JPQL
@Query("SELECT new com.app.dto.UserSummary(u.nombre, u.email) FROM Usuario u")
List<UserSummary> findUserSummaries();

// QueryDSL para consulta dinámica segura
QUser user = QUser.user;
List<User> users = queryFactory.selectFrom(user)
    .where(user.nombre.startsWith("A"))
    .fetch();
```

---

## 7. Relaciones de Entidad JPA (JPA entity, @manytomany, @manytoone, @onetomany)
**Descripción**
Mapear las relaciones del mundo real a un esquema de base de datos es una habilidad central. JPA proporciona anotaciones como @OneToMany, @ManyToOne y @ManyToMany para manejar estas conexiones, junto con "mappedBy" para definir qué lado es el dueño de la relación.

El mapeo avanzado incluye estrategias de herencia (SINGLE_TABLE vs JOINED). SINGLE_TABLE es rápido pero puede dejar muchas columnas nulas, mientras que JOINED es más normalizado pero requiere JOINs complejos. La elección depende de los patrones de consulta específicos y el volumen de datos.

La eliminación de huérfanos (orphan removal) y el cascaded son características potentes que automatizan el borrado de registros relacionados. Sin embargo, deben usarse con extrema precaución para evitar borrar accidentalmente grandes cantidades de datos. El diseño adecuado de las relaciones es la base de un modelo de dominio limpio y eficiente.

**Puntos Clave**
*   Modela dominios de negocio complejos en esquemas relacionales utilizando anotaciones de mapeo estandarizadas y estrategias de herencia para asegurar la consistencia de los datos.

**Ejemplo**
```java
@Entity
public class Curso {
    @ManyToMany
    @JoinTable(
        name = "curso_estudiante",
        joinColumns = @JoinColumn(name = "curso_id"),
        inverseJoinColumns = @JoinColumn(name = "estudiante_id")
    )
    private Set<Estudiante> estudiantes;
}
```

---

## 8. Consultas Nativas vs JPQL (native query vs JPQL)
**Descripción**
JPQL (Java Persistence Query Language) es un lenguaje de consulta orientado a objetos que opera sobre entidades JPA en lugar de tablas de base de datos directamente. Es portable entre diferentes motores de base de datos porque el proveedor JPA lo traduce al SQL específico de la plataforma correspondiente.

Las consultas nativas (`@Query(nativeQuery = true)`) permiten escribir SQL directo para aprovechar características específicas del motor (como funciones de ventana de PostgreSQL u optimizaciones de Oracle) que JPQL no puede expresar. Sin embargo, al hacerlo se pierde la portabilidad entre bases de datos.

La elección entre JPQL y SQL nativo es un equilibrio entre portabilidad y potencia. La práctica recomendada es usar JPQL para la mayoría de las operaciones CRUD y reservar las consultas nativas para escenarios de optimización específicos donde el rendimiento es crítico.

**Puntos Clave**
*   Permite seleccionar entre abstracción portable con JPQL y potencia específica de la base de datos con SQL nativo, según las necesidades de rendimiento y portabilidad.

**Ejemplo**
```java
// JPQL: Portable y orientado a entidades
@Query("SELECT u FROM Usuario u WHERE u.email = :email")
Optional<Usuario> findByEmail(String email);

// Nativa: SQL específico del motor para mayor rendimiento
@Query(value = "SELECT * FROM usuarios WHERE LOWER(email) = LOWER(:email)", nativeQuery = true)
Optional<Usuario> findByEmailNative(String email);
```

---

## 9. Constructores de Consultas JPA (JPA query builders (QueryDSL, Criteria Query, Specification))
**Descripción**
La Criteria API de JPA y QueryDSL son herramientas para construir consultas dinámicas de forma segura en cuanto a tipos. A diferencia de las cadenas de texto JPQL, los errores de sintaxis se detectan en tiempo de compilación, no en tiempo de ejecución, reduciendo los defectos de producción.

Las Especificaciones de Spring Data (`Specification<T>`) son una implementación del patrón Specification sobre la Criteria API. Permiten definir filtros reutilizables y componibles que se pueden combinar dinámicamente usando `and()` y `or()`, siendo ideales para páginas de búsqueda avanzada.

QueryDSL ofrece una API más fluida y legible que la Criteria API estándar, generando clases de tipo seguro (como `QUsuario`) a partir de las entidades. Esto hace que las consultas complejas sean mucho más fáciles de escribir y mantener que su equivalente en JPQL puro.

**Puntos Clave**
*   Permite la creación de consultas dinámicas, seguras y componibles que reducen los bugs en tiempo de ejecución y facilitan el mantenimiento de lógica de consulta compleja.

**Ejemplo**
```java
// Specification componible para búsqueda dinámica
public static Specification<Usuario> tieneNombre(String nombre) {
    return (root, query, cb) -> 
        nombre == null ? null : cb.like(root.get("nombre"), "%" + nombre + "%");
}

// Composición dinámica en el servicio
userRepository.findAll(Specification.where(tieneNombre("Ana")).and(tieneEdad(30)));
```
