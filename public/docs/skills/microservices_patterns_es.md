````markdown
# Patrones de Microservicios

Este documento describe patrones arquitectónicos y de diseño comunes en arquitecturas de microservicios. Cada sección ofrece una visión concisa del patrón, cuándo usarlo, ventajas y consideraciones.

---

## CQRS (Command Query Responsibility Segregation)
**Descripción**
CQRS separa las operaciones de lectura (queries) de las de escritura (commands), permitiendo optimizar y escalar de forma independiente ambos caminos. Su uso facilita modelos de lectura especializados y mejora el rendimiento en sistemas con requisitos distintos para lectura y escritura.

**Consideraciones**
* Útil cuando los modelos de lectura y escritura tienen necesidades diferentes.
* Aumenta la complejidad y requiere mecanismos para sincronizar vistas (proyecciones).

---

## Database per service (Base de datos por servicio)
**Descripción**
Cada microservicio tiene su propia base de datos (o esquema aislado) para garantizar su independencia y permitir decisiones de persistencia optimizadas por dominio.

**Consideraciones**
* Evita acoplamiento por esquema, pero complica las transacciones distribuidas.

---

## Saga
**Descripción**
Patrón para gestionar transacciones distribuidas coordinando una serie de pasos locales y compensaciones en caso de fallo. Puede ser orquestado (un coordinador central) o coreografiado (eventos entre servicios).

**Consideraciones**
* Manejo de consistencia eventual y compensaciones.

---

## API Gateway
**Descripción**
Punto de entrada único para clientes que enruta peticiones a microservicios backend, maneja autenticación, throttling, agregación de respuestas y versionado.

**Consideraciones**
* Buen lugar para aplicar cross-cutting concerns, pero puede convertirse en cuello de botella si no se dimensiona adecuadamente.

---

## Event Sourcing
**Descripción**
En vez de persistir el estado actual, se persisten todos los eventos que llevaron al estado. Permite reconstruir el estado y tener un audit trail completo.

**Consideraciones**
* Facilita reconstrucción histórica, pero añade complejidad en el modelado y queries por proyecciones.

---

## Sidecar
**Descripción**
Patrón de despliegue donde un proceso auxiliar (sidecar) acompaña a un servicio principal en el mismo pod/container para proporcionar funcionalidades transversales (logs, proxies, certificados, sidecar proxy de red).

**Consideraciones**
* Permite separar responsabilidades sin modificar el servicio principal.

---

## Circuit Breaker
**Descripción**
Mecanismo para prevenir llamadas repetidas a servicios que están fallando, mejorando resiliencia mediante fallback, retries y degradación controlada.

**Consideraciones**
* Evitar cascadas de fallos y reducir carga en servicios degradados.

---

## BFF (Backend For Frontend)
**Descripción**
Capa específica para cada tipo de cliente (web, mobile) que compone y adapta APIs backend a las necesidades del cliente.

**Consideraciones**
* Mejora la experiencia cliente pero implica mantenimiento de múltiples BFFs.

---

## Journey
**Descripción**
Patrón conceptual para mapear y diseñar flujos de negocio (customer journeys) a través de servicios, asegurando que cada etapa tenga un servicio claro y eventos bien definidos.

**Consideraciones**
* Útil para alinear arquitectura con procesos de negocio y métricas por etapa.

````