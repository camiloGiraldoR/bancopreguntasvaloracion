# Descripciones de Habilidades: Principios de Diseño Core

Este documento cubre los principios y patrones de diseño esenciales que aseguran que el software sea mantenible, escalable y robusto.

---

## 1. DRY (DRY)
**Descripción**
El principio DRY establece que cada pieza de conocimiento debe tener una representación única, inequívoca y autorizada dentro de un sistema. La duplicación en el código o en la lógica conduce a pesadillas de mantenimiento, ya que un cambio en un lugar requiere actualizaciones manuales y propensas a errores en todos los demás puntos duplicados.

Evitar la repetición no significa que nunca debas tener código con apariencia similar. Se trata de evitar la duplicación de *conocimiento* o *lógica*. A veces, el código que parece similar por coincidencia sirve a propósitos diferentes y debe permanecer separado para evitar la "abstracción prematura".

Cuando se aplica correctamente, DRY mejora la claridad del sistema y reduce la superficie de error para los bugs. Fomenta el uso de funciones, módulos y estructuras de datos para centralizar comportamientos comunes, haciendo que la base de código sea más fácil de razonar y evolucionar.

**Puntos Clave**
*   Reduce la inconsistencia y el esfuerzo de mantenimiento al asegurar que cada concepto lógico existe en un solo lugar de la base de código.

**Ejemplo**
```java
// Mal: Lógica de validación duplicada
public void crearUsuario(String email) {
    if (!email.contains("@")) throw new IllegalArgumentException();
    // ...
}
public void actualizarEmail(String email) {
    if (!email.contains("@")) throw new IllegalArgumentException();
    // ...
}

// Bien: Lógica centralizada
private void validarEmail(String email) {
    if (!email.contains("@")) throw new IllegalArgumentException();
}
```

---

## 2. Principios SOLID (Programming - SOLID)
**Descripción**
SOLID es un acrónimo de cinco principios de diseño destinados a hacer que los diseños de software sean más comprensibles, flexibles y mantenibles. Estos incluyen Responsabilidad Única, Abierto/Cerrado, Sustitución de Liskov, Segregación de Interfaz e Inversión de Dependencia.

El Principio de Responsabilidad Única (SRP) asegura que una clase tenga una sola razón para cambiar, mientras que el Principio de Abierto/Cerrado (OCP) fomenta que las clases estén abiertas para la extensión pero cerradas para la modificación. Juntos, forman la base del diseño flexible orientado a objetos.

Seguir SOLID ayuda a prevenir la "putrefacción del código" y hace que sea mucho más fácil refactorizar o extender el sistema a medida que los requisitos cambian. Cambia el enfoque de escribir simplemente código que "funcione" a escribir código "sostenible" que pueda sobrevivir al ciclo de vida a largo plazo de un proyecto.

**Puntos Clave**
*   Proporciona un marco riguroso para el diseño orientado a objetos que prioriza el bajo acoplamiento y la alta cohesión para asegurar la salud del sistema a largo plazo.

**Ejemplo**
```java
// Responsabilidad Única (SRP)
public class Reporte {
    public void generar() { /* lógica */ }
}
public class ReporteImpresora {
    public void imprimir(Reporte r) { /* lógica de impresión */ }
}
```

---

## 3. DDD Táctico (DDD (Aggregates - Value Objects - Entities - Domain Services))
**Descripción**
El Diseño Orientado al Dominio (DDD) táctico se enfoca en los detalles de implementación dentro de un único contexto delimitado (Bounded Context). Introduce patrones como Agregados, Entidades, Objetos de Valor (Value Objects) y Servicios de Dominio para modelar la lógica de negocio central de manera efectiva.

Las Entidades tienen una identidad única que persiste en el tiempo, mientras que los Objetos de Valor se definen solo por sus atributos y son inmutables. Los Agregados actúan como un grupo de objetos asociados que tratamos como una sola unidad para los cambios de datos, asegurando los límites de consistencia.

Al usar estos patrones tácticos, los desarrolladores pueden asegurar que el código refleje fielmente el modelo mental del negocio. Esta alineación reduce las brechas de comunicación entre desarrolladores y partes interesadas, y conduce a una capa de dominio más robusta y expresiva.

**Puntos Clave**
*   Modela lógica de negocio compleja usando patrones estructurados como Agregados y Objetos de Valor para asegurar la consistencia de los datos y la claridad del dominio.

**Ejemplo**
```java
// Objeto de Valor (Inmutable)
public record Dinero(BigDecimal cantidad, String moneda) {}

// Entidad (Con Identidad)
public class Producto {
    private final UUID id;
    private String nombre;
    private Dinero precio;
}
```

---

## 4. Inyección de Dependencias / IoC (Angular | Dependency Injection / Inversion of Control)
**Descripción**
La Inyección de Dependencias (DI) es una técnica donde un objeto recibe sus dependencias de una fuente externa en lugar de crearlas por sí mismo. Esta es una forma específica de Inversión de Control (IoC), donde el control sobre el flujo del programa se traslada a un framework o contenedor.

La DI mejora significativamente la capacidad de prueba (testability) porque permite que las dependencias (como una base de datos o un cliente de API) sean fácilmente intercambiadas por mocks o stubs durante las pruebas unitarias. También reduce el acoplamiento al asegurar que las clases dependan de abstracciones en lugar de implementaciones concretas.

En los frameworks modernos como Spring o Angular, la DI es una característica central que gestiona el ciclo de vida de los componentes. Esto permite a los desarrolladores enfocarse en la lógica de negocio mientras el framework se encarga de "conectar" las diversas partes del sistema.

**Puntos Clave**
*   Desacopla componentes al proporcionar dependencias externamente, lo que mejora drásticamente la capacidad de prueba y la flexibilidad arquitectónica.

**Ejemplo**
```java
// Sin DI (Acoplado)
public class Servicio {
    private MySqlRepo repo = new MySqlRepo();
}

// Con DI (Desacoplado)
public class Servicio {
    private Repository repo;
    public Servicio(Repository repo) { // El framework inyecta la implementación
        this.repo = repo;
    }
}
```

---

## 5. Patrones de Diseño (Design Patterns (Singleton, Factory, Decorator, etc))
**Descripción**
Los Patrones de Diseño son soluciones reutilizables a problemas que ocurren comúnmente en el diseño de software. Representan las mejores prácticas evolucionadas por desarrolladores experimentados a lo largo del tiempo. Los patrones de creación como Singleton y Factory manejan la creación de objetos, mientras que los patrones estructurales como Decorator añaden comportamiento dinámicamente.

Un Singleton asegura que una clase tenga una sola instancia, mientras que una Factory proporciona una interfaz para crear objetos en una superclase pero permite a las subclases alterar el tipo de objetos que se crearán. Estos patrones proporcionan un vocabulario común para que los desarrolladores comuniquen ideas de diseño complejas.

Patrones como el Decorator permiten añadir nueva funcionalidad a un objeto existente sin alterar su estructura, adhiriéndose al principio de Abierto/Cerrado. Entender cuándo *no* usar un patrón es tan importante como saber cómo implementarlo, para evitar la "sobre-ingeniería".

**Puntos Clave**
*   Ofrece un lenguaje estándar y soluciones probadas para desafíos estructurales y creativos, promoviendo la reutilización del código y la consistencia arquitectónica.

**Ejemplo**
```java
// Factory Method
public interface Notificacion { void enviar(); }

public class NotificacionFactory {
    public Notificacion crear(String tipo) {
        if (tipo.equals("SMS")) return new SmsNotificacion();
        return new EmailNotificacion();
    }
}
```

---

## 6. MVC - DAO / DTO / Repository (MVC - DAO / DTO / Repository / Controller)
**Descripción**
Patrones arquitectónicos como MVC (Modelo-Vista-Controlador) y patrones de datos como DAO (Data Access Object), DTO (Data Transfer Object) y Repository ayudan a organizar las responsabilidades de las diferentes capas en una aplicación. Aseguran una separación clara entre los datos, la lógica y la presentación.

Los DAOs y Repositorios abstraen los detalles de la persistencia de datos, permitiendo que el resto de la aplicación interactúe con los datos como si fueran una simple colección. Los DTOs se utilizan para transferir datos entre procesos o capas sin exponer las estructuras internas de las entidades.

Esta separación de preocupaciones hace que la aplicación sea más fácil de mantener y probar. Asegura que los cambios en el esquema de la base de datos no se filtren en la lógica de negocio, y que los cambios en la UI no requieran modificaciones en los modelos de datos subyacentes.

**Puntos Clave**
*   Organiza las responsabilidades de la aplicación en capas distintas, asegurando que los detalles de persistencia y transferencia de datos no contaminen la lógica de negocio central.

**Ejemplo**
```java
// DTO: Solo datos para la API
public record UserDTO(String username, String email) {}

// Repository: Abstracción de persistencia
public interface UserRepository extends JpaRepository<User, Long> {}
```

---

## 7. Programación Reactiva (Reactive Programing)
**Descripción**
La Programación Reactiva es un paradigma de programación declarativo preocupado por los flujos de datos y la propagación del cambio. Es particularmente útil para construir sistemas altamente receptivos y escalables que pueden manejar un gran número de eventos concurrentes.

En un sistema reactivo, los componentes reaccionan a los datos o eventos entrantes a medida que ocurren, a menudo utilizando E/S no bloqueante. Esto permite que el sistema permanezca receptivo incluso bajo carga pesada, ya que los hilos no se quedan bloqueados esperando recursos externos.

Frameworks como Project Reactor o RxJava proporcionan herramientas para componer flujos de trabajo asíncronos complejos utilizando operadores de estilo funcional. Este enfoque cambia el enfoque de "cómo" procesar los datos a "qué" debe ser el resultado del flujo.

**Puntos Clave**
*   Se enfoca en flujos de datos asíncronos y lógica dirigida por eventos para construir sistemas altamente escalables y receptivos bajo alta concurrencia.

**Ejemplo**
```java
// Project Reactor (Flux)
Flux.just("A", "B", "C")
    .map(String::toLowerCase)
    .subscribe(System.out::println);
```

---

## 8. JWT (JWT Tokens)
**Descripción**
Los JSON Web Tokens (JWT) son un medio compacto y seguro para URL de representar afirmaciones (claims) que se transfieren entre dos partes. Se utilizan ampliamente para la autenticación y el intercambio de información en aplicaciones web modernas y microservicios.

Un JWT consta de una Cabecera (Header), una Carga útil (Payload) y una Firma (Signature). Dado que están firmados digitalmente, el receptor puede verificar que las afirmaciones no han sido manipuladas. Esto los hace ideales para la autenticación sin estado (stateless), ya que el servidor no necesita almacenar el estado de la sesión.

Debido a que los JWT son autónomos y sin estado, permiten un escalado horizontal fácil de los servicios. Sin embargo, también requieren una gestión cuidadosa, como establecer tiempos de expiración adecuados y manejar la revocación de tokens de manera segura.

**Puntos Clave**
*   Permite un intercambio de afirmaciones y una autenticación segura y sin estado, facilitando la escalabilidad de las arquitecturas distribuidas modernas.

**Ejemplo**
```javascript
// Estructura conceptual de un JWT
const token = header.payload.signature;
// El servidor verifica la firma con su clave secreta
```
 
---

## 9. ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad)
**Descripción**
ACID es un conjunto de propiedades que garantizan el procesamiento confiable de transacciones en una base de datos. Atomicidad asegura que una transacción se ejecute completamente o no se ejecute; Consistencia garantiza que la transacción lleve a la base de datos de un estado válido a otro; Aislamiento controla cómo y cuándo los efectos de una transacción son visibles a otras; Durabilidad garantiza que los cambios confirmados sobrevivan a fallos y reinicios.

**Consideraciones**
* ACID es preferible en sistemas que requieren consistencia fuerte y exactitud (p. ej. sistemas financieros).
* En entornos distribuidos, alcanzar ACID completo es costoso; protocolos como two-phase commit añaden latencia y complejidad. Alternativas prácticas incluyen sagas y compensaciones para alcanzar consistencia eventual.

**Puntos Clave**
*   Atomicidad: transacciones todo-o-nada.
*   Consistencia: invariantes y restricciones preservadas.
*   Aislamiento: controla anomalías de concurrencia (dirty reads, non-repeatable reads, phantom reads).
*   Durabilidad: los commits persisten frente a fallos.

**Ejemplo**
```sql
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

**Consejos prácticos**
* Escoge el nivel de aislamiento adecuado según el workload para balancear corrección y rendimiento.
* Para operaciones distribuidas, considera sagas o compensaciones en lugar de transacciones distribuidas bloqueantes cuando sea posible.

---

## 9. Node Js | Microservices Patterns (Node.js | Microservices Patterns)
**Descripción**
Node.js es una plataforma orientada a eventos construida sobre el motor V8 de Chrome que destaca por su modelo de E/S no bloqueante y su bajo consumo de memoria por conexión. Estas características la hacen especialmente adecuada para implementar microservicios ligeros y de alta concurrencia.

En arquitecturas de microservicios, Node.js suele usarse para construir servicios responsables de una única capacidad del dominio (bounded context), exponiendo APIs HTTP/REST o gRPC, y comunicándose con otros servicios mediante mensajería (AMQP, Kafka, NATS) o APIs síncronas. Los patrones comunes que acompañan a microservicios en Node.js incluyen: API Gateway, Service Discovery, Circuit Breaker, Bulkhead, Retry/Backoff, Saga para transacciones distribuidas y Event Sourcing/CQRS para separar comandos y consultas.

Implementar estos patrones en Node.js requiere atención a la resiliencia (timeouts, reintentos, circuit breakers), a la observabilidad (logs estructurados, trazas distribuidas, métricas) y a la gestión de estado (stateless services vs. externalización del estado en bases de datos o caches). Además, la contenedorización (Docker) y la orquestación (Kubernetes) son prácticas habituales para escalar y desplegar microservicios Node.js en producción.

**Puntos Clave**
*   E/S no bloqueante y alto rendimiento para cargas concurrentes ligeras.
*   Patrones de resiliencia: Circuit Breaker, Retry, Bulkhead y timeouts para proteger servicios dependientes.
*   Comunicación: preferir mensajería asíncrona para desacoplar y mejorar la tolerancia a fallos.
*   Observabilidad: métricas (Prometheus), trazas (OpenTelemetry) y logs estructurados para depuración y SLOs.
*   Considerar la limitación de CPU-bound tasks (usar workers o servicios especializados) y la gestión de memory leaks en long-running processes.

**Ejemplo**
```javascript
// Ejemplo sencillo: microservicio Express con health-check y publicación a un broker (conceptual)
const express = require('express');
const bodyParser = require('body-parser');
// const amqp = require('amqplib'); // Ejemplo con AMQP

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/orders', async (req, res) => {
    const order = req.body;
    // Validar y persistir en BD...
    // Publicar evento a un broker para que otros servicios reaccionen
    // await channel.publish('exchange', 'order.created', Buffer.from(JSON.stringify(order)));
    res.status(201).json({ id: 'order-123', ...order });
});

app.listen(3000, () => console.log('Orders service listening on 3000'));
```

**Recomendaciones prácticas**
*   Mantener servicios pequeños y con una única responsabilidad para facilitar despliegues independientes.
*   Externalizar estado (bases de datos, caches) y usar contratos de API/versionado para evitar roturas entre versiones.
*   Implementar pruebas de contrato (contract testing) y pruebas de integración con entornos que simulen el broker y dependencias.
*   Usar circuit breakers (p.ej. `opossum`), retries con backoff y bulkheads para mejorar resiliencia.
