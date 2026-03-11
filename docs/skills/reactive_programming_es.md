# Descripciones de Skills: Reactive Programming

Este documento contiene descripciones para cada skill de Reactive Programming. El paradigma reactivo enfatiza responsividad, resiliencia, elasticidad y comunicación orientada a mensajes.

---

## Responsive

**Descripción**
Los sistemas responsivos responden a los usuarios rápido y de forma consistente. El sistema mantiene tiempos de respuesta predecibles bajo diferentes cargas, asegurando que las interacciones del usuario se sientan rápidas y confiables incluso durante picos de uso.

**Conceptos Clave**
- Tiempos de respuesta consistentes y predecibles (latencia acotada)
- I/O no-bloqueante y procesamiento event-driven
- Monitoreo mediante percentiles de latencia P50, P95, P99
- Percepción del usuario de que el sistema está vivo

---

## Resilient

**Descripción**
Los sistemas resilientes continúan operando a pesar de fallos. La resiliencia se logra a través del aislamiento de componentes, mecanismos de recuperación automática, y contención de fallos—asegurando que fallos en una parte no cascada por todo el sistema.

**Conceptos Clave**
- Tolerancia a fallos y degradación elegante
- Patrones Circuit Breaker, Retry, y Fallback
- Bulkheads: aislando threads, conexiones, o recursos
- Supervisión y capacidades de auto-sanación

---

## Elastic

**Descripción**
Los sistemas elásticos escalan automáticamente recursos hacia arriba o hacia abajo según la demanda sin cambios de código. Esto permite que las aplicaciones manejen picos repentinos de tráfico manteniendo responsividad y siendo costo-efectivas durante períodos de baja carga.

**Conceptos Clave**
- Escalado horizontal (agregando más instancias)
- Escalado vertical (aumentando recursos de la máquina)
- Sin estado compartido entre réplicas (diseño stateless)
- Auto-escalado impulsado por métricas
- Optimización de costos (pagar por lo que usas)

---

## Message Driven

**Descripción**
Los sistemas orientados a mensajes usan paso de mensajes asincronos para comunicación entre componentes en lugar de llamadas RPC síncronas. Esto desacopla componentes, mejora escalabilidad, y permite mejor resiliencia mediante desacoplamiento temporal.

**Conceptos Clave**
- Colas de mensajes no-bloqueantes y asincronos
- Patrones Pub-Sub y Request-Reply
- Desacoplamiento temporal y espacial de componentes
- Garantías de entrega: At-Most-Once, At-Least-Once, Exactly-Once

---

## Java WebFlux

**Descripción**
Spring WebFlux es un framework web reactivo construido sobre Project Reactor, habilitando aplicaciones web no-bloqueantes y event-driven. Maneja alta concurrencia con menos threads aprovechando procesamiento asincrónico y manejo de backpressure.

**Ejemplo Real**
Un servicio de notificaciones en tiempo real recibiendo millones de eventos de usuarios por segundo. WebFlux maneja eficientemente todas las conexiones con un único pool de threads event-loop en lugar de un thread por request, reduciendo dramáticamente el uso de memoria y mejorando responsividad.

**Conceptos Clave**
- Endpoints funcionales y anotados (@RestController)
- I/O no-bloqueante con Netty
- Manejo de backpressure y control de flujo
- Manejo de errores con operadores (onErrorReturn, onErrorResume)
- Integración con bases de datos y servicios vía drivers reactivos

---

## Mono

**Descripción**
Mono es un tipo de stream reactivo de Project Reactor que emite 0 o 1 elemento, más opcionalmente señales de error o completación. Representa una operación asincrónica con un único resultado (o sin resultado), perfecto para computaciones async simples.

**Ejemplo Real**
Un endpoint REST que recupera un usuario por ID. En lugar de `User getUserById(Long id)`, retornas `Mono<User>`. Esto permite que el framework maneje miles de requests concurrentes eficientemente sin bloquear threads esperando resultados de base de datos.

**Conceptos Clave**
- Evaluación perezosa (computación diferida hasta suscripción)
- Operadores de transformación: map(), flatMap(), filter()
- Manejo de errores: onErrorReturn(), onErrorResume()
- Diferencia con Optional: asincrónico, componible, no-bloqueante
- Nunca bloquear: evitar block() en cadenas reactivas

---

## Flux

**Descripción**
Flux es un tipo de stream reactivo de Project Reactor que emite 0 a N elementos en el tiempo. Es ideal para representar streams de datos que fluyen continuamente, soportando backpressure para prevenir saturar consumidores downstream.

**Ejemplo Real**
Un endpoint de server-sent events (SSE) que transmite actualizaciones de precios de acciones cada 100ms a múltiples clientes. Flux<StockPrice> emite nuevos precios conforme llegan, y WebFlux maneja backpressure: si un cliente se atrasa, el servidor reduce la tasa de emisión automáticamente.

**Conceptos Clave**
- Creación: fromIterable(), range(), interval(), create()
- Composición: zip(), merge(), concat()
- Transformación: map(), flatMap(), concatMap()
- Filtrado y buffering: filter(), buffer(), window()
- Recuperación de errores: retry(), onErrorResume(), onErrorComplete()
