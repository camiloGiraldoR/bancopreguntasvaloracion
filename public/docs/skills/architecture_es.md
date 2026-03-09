# Descripciones de Habilidades: Principios de Arquitectura

Este documento explora los patrones estructurales de alto nivel, las estrategias de infraestructura y los principios organizacionales que definen la arquitectura de software moderna.

---

## 1. Serverless (serverless)
**Descripción**
La arquitectura Serverless es un modelo de desarrollo nativo de la nube que permite a los desarrolladores construir y ejecutar aplicaciones sin tener que gestionar servidores. El proveedor de la nube se encarga de la infraestructura, el escalado y el mantenimiento, permitiendo que los equipos se enfoquen puramente en escribir código (Functions as a Service - FaaS).

En un modelo serverless, los recursos se asignan dinámicamente y se facturan en función del tiempo real de ejecución, en lugar de la capacidad pre-aprovisionada. Esto conlleva ahorros significativos de costos para cargas de trabajo con tráfico variable y reduce la carga operativa de los equipos de DevOps.

Sin embargo, serverless también introduce desafíos como los "arranques en frío" (cold starts), donde la primera ejecución de una función tras un periodo de inactividad puede experimentar latencia. También requiere un cambio de mentalidad hacia la lógica dirigida por eventos y el procesamiento sin estado para aprovechar al máximo los beneficios de la plataforma.

**Puntos Clave**
*   Elimina la gestión manual de servidores y escala automáticamente según la demanda, permitiendo una alta agilidad y eficiencia de costos para cargas de trabajo dirigidas por eventos.

**Ejemplo**
Un sensor de temperatura que envía datos cada hora. En lugar de tener un servidor encendido 24/7, una **AWS Lambda** se activa solo cuando llega el dato, procesa la alerta y se apaga, cobrando solo por los milisegundos de ejecución.

---

## 2. Contenedores (Containers)
**Descripción**
Los contenedores proporcionan una forma ligera y portátil de empaquetar aplicaciones junto con sus dependencias, librerías y configuración. A diferencia de las máquinas virtuales, los contenedores comparten el kernel del sistema operativo anfitrión, lo que los hace mucho más eficientes y rápidos de arrancar.

Herramientas como Docker y plataformas de orquestación como Kubernetes han convertido a los contenedores en el estándar para las arquitecturas modernas de microservicios. Aseguran que una aplicación se comporte de la misma manera en entornos de desarrollo, prueba y producción, eliminando el problema de "funciona en mi máquina".

La contenedorización facilita una mejor utilización de los recursos y permite estrategias de despliegue sofisticadas como lanzamientos blue-green o canary. Es una piedra angular de las prácticas de DevOps, soportando pipelines de integración y entrega continua.

**Puntos Clave**
*   Garantiza un comportamiento consistente de la aplicación en diferentes entornos al empaquetar las dependencias en unidades portátiles, ligeras y aisladas.

**Ejemplo**
Un archivo `Dockerfile` que define node:18 como base, instala dependencias y copia el código. Este contenedor correrá exactamente igual en el laptop de un desarrollador que en un clúster de **Kubernetes** en la nube.

---

## 3. Asíncrono no bloqueante (Async non blocking (Workflows))
**Descripción**
La arquitectura asíncrona no bloqueante permite que un sistema maneje múltiples tareas de forma concurrente sin esperar a que las operaciones lentas (como la E/S) finalicen. Esto es esencial para construir aplicaciones de alto rendimiento que pueden manejar un gran número de conexiones simultáneas.

Mediante el uso de patrones asíncronos, un solo hilo puede iniciar múltiples peticiones y continuar procesando otro trabajo mientras espera las respuestas. Cuando los resultados están listos, el sistema utiliza callbacks, promesas o flujos reactivos para finalizar la tarea.

En sistemas complejos, esto suele evolucionar hacia patrones de "Workflow" o flujos de trabajo, donde los procesos de larga duración se gestionan como una serie de pasos discretos y asíncronos. Este enfoque asegura que el sistema siga siendo receptivo y resiliente incluso cuando trata con servicios externos lentos.

**Puntos Clave**
*   Optimiza la utilización de recursos y la capacidad de respuesta del sistema al permitir que los hilos procesen otras tareas mientras esperan a que finalicen las operaciones de E/S.

**Ejemplo**
Un servidor web que recibe una petición para generar un PDF pesado. En lugar de bloquear el hilo esperando la generación, devuelve un "ID de proceso" al cliente y procesa el PDF en segundo plano usando un **CompletableFuture** o una cola de mensajes.

---

## 4. Arquitectura Limpia / Cebolla (Clean/Onion Architecture)
**Descripción**
La Arquitectura Limpia (y su variante, la Arquitectura de Cebolla) es una filosofía de diseño que organiza el código en capas concéntricas, con la lógica de negocio central en el medio. La regla fundamental es que las dependencias solo deben apuntar hacia adentro, hacia el núcleo.

La capa central contiene el Modelo de Dominio y las reglas de negocio, que son completamente independientes de herramientas externas como bases de datos, frameworks web o la interfaz de usuario. Las preocupaciones externas se empujan a las capas exteriores (Infraestructura, Web, etc.) e interactúan con el núcleo a través de interfaces.

Esta separación estricta hace que la aplicación sea altamente testeable e independiente de cambios externos. Permite a los desarrolladores cambiar una base de datos o un framework de UI sin tocar la lógica de negocio central, asegurando que el software siga siendo mantenible durante décadas.

**Puntos Clave**
*   Protege la lógica de negocio central de los cambios tecnológicos externos mediante la imposición de una regla estricta de dependencias que apuntan hacia adentro.

**Ejemplo**
Una clase `OrderService` (en el núcleo) que define que necesita un `OrderRepository`. La implementación real que usa **PostgreSQL** vive en la capa de infraestructura. Si mañana cambiamos a **MongoDB**, el `OrderService` no sufre ningún cambio.

---

## 5. Actores (Actors)
**Descripción**
El Modelo de Actores es un modelo matemático para la computación concurrente donde los "Actores" son las primitivas universales. Cada actor es una unidad independiente que encapsula estado y comportamiento, comunicándose con otros actores exclusivamente a través de mensajes asíncronos.

En este modelo, los actores no comparten memoria. En su lugar, gestionan su propio estado localmente, lo que elimina completamente la necesidad de bloqueos (locks) y previene condiciones de carrera. Esto hace que el sistema sea mucho más fácil de razonar en un entorno altamente concurrente o distribuido.

Los frameworks basados en actores (como Akka o Erlang) proporcionan supervisión y tolerancia a fallos integradas. Dado que los actores están aislados, si uno falla, su supervisor puede reiniciarlo sin afectar al resto del sistema, permitiendo la creación de arquitecturas "auto-sanables".

**Puntos Clave**
*   Simplifica la concurrencia mediante el uso de unidades independientes que se comunican vía mensajes, evitando el estado compartido y proporcionando tolerancia a fallos nativa.

**Ejemplo**
Un sistema de chat donde cada usuario es un **Actor**. Cuando el Usuario A envía un mensaje al Usuario B, el Actor A envía un mensaje asíncrono al buzón del Actor B. No hay base de datos compartida bloqueando el proceso.

---

## 6. Brokers (Brokers)
**Descripción**
Los message brokers actúan como intermediarios entre diferentes servicios en un sistema distribuido. Son responsables de recibir, almacenar y entregar mensajes, permitiendo que los servicios se comuniquen de forma asíncrona sin estar conectados directamente entre sí.

Brokers como RabbitMQ o Apache Kafka permiten a los productores enviar mensajes sin saber quiénes son los consumidores. Este desacoplamiento permite que los servicios escalen de forma independiente y asegura que los mensajes no se pierdan si un consumidor no está disponible temporalmente.

Al usar un broker, los arquitectos pueden implementar patrones complejos como la nivelación de carga (load leveling), donde el broker actúa como un búfer durante picos de tráfico. Esto protege a los servicios aguas abajo de ser abrumados y aumenta la fiabilidad general del sistema.

**Puntos Clave**
*   Desacopla los servicios y asegura la entrega fiable de mensajes actuando como un centro de comunicación asíncrona en sistemas distribuidos.

**Ejemplo**
Un ecommerce donde el servicio de "Pedidos" publica un mensaje en **RabbitMQ** cada vez que hay una venta. El servicio de "Inventario" y el de "Email" consumen ese mensaje a su propio ritmo para actualizar stock y enviar la confirmación.

---

## 7. Patrones de Nube (Cloud Patterns)
**Description**
Los Patrones de Nube son soluciones arquitectónicas diseñadas específicamente para manejar los desafíos únicos de los sistemas distribuidos en la nube. Estos incluyen patrones para la resiliencia (Circuit Breaker, Retry), escalabilidad (Sidecar, Ambassador) y consistencia de datos (Saga, CQRS).

El patrón Circuit Breaker, por ejemplo, evita un fallo en cascada al detener las peticiones a un servicio que ya está fallando. El patrón Saga gestiona transacciones complejas a través de múltiples microservicios sin requerir bloqueos globales costosos y lentos.

Estos patrones representan un cambio de diseñar para sistemas "perfectos" a diseñar para sistemas "tolerantes a fallos". En la nube, el fallo es inevitable, por lo que estos patrones aseguran que la aplicación pueda degradarse con elegancia y recuperarse automáticamente.

**Puntos Clave**
*   Proporciona estrategias probadas para gestionar la resiliencia, la escalabilidad y la consistencia distribuida en entornos de nube impredecibles.

**Ejemplo**
Uso de **Netflix Hystrix** o **Resilience4j** para implementar un **Circuit Breaker**. Si el servicio de pagos falla repetidamente, el circuito se "abre" y el sistema devuelve un error rápido o un mensaje amigable en lugar de dejar al usuario esperando hasta el timeout.

---

## 8. DDD Estratégico (DDD (Strategic Design - Bounded Contexts - Context Mapping))
**Descripción**
El Diseño Orientado al Dominio (DDD) estratégico trata sobre la gestión de la complejidad a gran escala dividiendo un sistema en "Contextos Delimitados" (Bounded Contexts). Cada contexto tiene sus propios límites, modelos y lenguaje (Lenguaje Ubicuo) específico para su subdominio de negocio.

En lugar de intentar crear un único modelo "universal" para toda la empresa (que suele volverse pesado y confuso), el DDD Estratégico acepta que diferentes departamentos ven los mismos conceptos de manera distinta. Un "Usuario" en el contexto de Facturación es diferente de un "Usuario" en el contexto de Marketing.

El Mapeo de Contextos (Context Mapping) es el proceso de definir cómo interactúan estos diferentes contextos. Al identificar claramente estos límites y sus relaciones, los arquitectos pueden prevenir la contaminación de modelos y permitir que los equipos trabajen de forma independiente.

**Puntos Clave**
*   Gestiona la complejidad arquitectónica dividiendo el sistema en subdominios aislados con límites claros y modelos especializados.

**Ejemplo**
En una plataforma de viajes, el concepto "Vuelo" para el equipo de **Reservas** incluye pasajeros y asientos, mientras que para el equipo de **Mantenimiento** de aviones, el mismo "Vuelo" se centra en combustible y horas de motor. Son dos **Bounded Contexts** distintos.

---

## 9. Arquitectura Dirigida por Datos (Data driving architecture)
**Descripción**
La Arquitectura Dirigida por Datos es un enfoque donde el flujo y la estructura de los datos dictan el diseño del sistema. En lugar de construir la lógica primero, el arquitecto se enfoca en cómo se capturan, transforman y distribuyen los datos a través de la organización.

En este modelo, el dato se trata como un ciudadano de primera clase, y el sistema se diseña para permitir analítica y toma de decisiones en tiempo real. Esto a menudo implica el uso de pipelines de datos, lagos (lakes) y almacenes (warehouses) como componentes centrales de la arquitectura.

Este enfoque es esencial para organizaciones que dependen del aprendizaje automático (ML) o del big data. Asegura que los datos estén disponibles de forma consistente y con alta calidad, permitiendo que el software se adapte y evolucione basándose en conocimientos reales de los datos en lugar de suposiciones prefijadas.

**Puntos Clave**
*   Sitúa los datos en el centro del diseño arquitectónico para permitir conocimientos en tiempo real, analítica y procesamiento intensivo de datos.

**Ejemplo**
Un sistema de recomendaciones como el de Netflix, donde la arquitectura no está definida por páginas web estáticas, sino por un **Pipeline de Datos** que analiza cada clic del usuario para reconfigurar la interfaz en tiempo real.

---

## 10. Arquitectura Hexagonal (Hexagonal (Ports and Adapters))
**Descripción**
La Arquitectura Hexagonal, también conocida como Puertos y Adaptadores, es la precursora de la Arquitectura Limpia. Su objetivo es crear aplicaciones que sean igualmente "enchufables" para diferentes tipos de usuarios, ya sean usuarios humanos, pruebas automatizadas u otros servicios.

En este patrón, el núcleo de la aplicación está rodeado de "Puertos" (interfaces). Los "Adaptadores" conectan los componentes externos (como una DB o una UI) a estos puertos. Esto hace que sea trivial cambiar cualquier dependencia externa sin modificar la lógica central.

El beneficio principal es la capacidad de probar el núcleo de la aplicación en total aislamiento de su entorno. Se puede ejecutar toda la lógica de negocio contra una base de datos simulada (mock) y una interfaz de línea de comandos, asegurando que las reglas son correctas antes de pensar en la tecnología.

**Puntos Clave**
*   Permite una arquitectura "enchufable" donde la lógica central está aislada de las tecnologías externas mediante puertos estandarizados y adaptadores intercambiables.

**Ejemplo**
Un puerto llamado `MessagePublisher`. En producción usamos el adaptador de **Kafka**, pero en los tests unitarios usamos un adaptador simple de **Consola** para verificar que el mensaje se enviaría correctamente sin levantar infraestructura real.

---

## 11. Arquitecturas Dirigidas por Eventos (Event Driven Architectures)
**Descripción**
La Arquitectura Dirigida por Eventos (EDA) es un patrón de diseño donde el sistema reacciona a cambios significativos en el estado, conocidos como "eventos". En una EDA, los componentes son productores o consumidores de eventos, lo que genera un sistema altamente desacoplado y reactivo.

Cuando ocurre algo (ej. se realiza un pedido), el sistema emite un evento. Otros servicios que necesitan saber sobre ese pedido pueden reaccionar de forma independiente. Esto elimina la necesidad de que los servicios se llamen entre sí directamente mediante APIs síncronas, reduciendo la latencia.

EDA es particularmente potente para sistemas complejos y distribuidos. Soporta el procesamiento en tiempo real y permite que el sistema evolucione fácilmente: se pueden añadir nuevos servicios simplemente suscribiéndolos a flujos de eventos existentes sin modificar a los productores.

**Puntos Clave**
*   Maximiza el desacoplamiento y la capacidad de respuesta del sistema al permitir que los componentes interactúen a través de flujos asíncronos de cambios de estado.

**Ejemplo**
Un sistema de logística donde el servicio de "Almacén" no sabe nada del servicio de "Ventas". Simplemente escucha el evento `PedidoCreado` e inicia la preparación del paquete de forma totalmente independiente.

---

## 12. Capas N (N-Layers (Tiers))
**Descripción**
La arquitectura de N-Capas es un patrón estructural tradicional que organiza una aplicación en capas lógicamente separadas (comúnmente: Presentación, Negocio/Servicio, Acceso a Datos y Base de Datos). Cada capa tiene una responsabilidad específica y se comunica con la capa inferior.

Las capas pueden ser "estrictas" (donde una capa solo habla con la inmediatamente inferior) o "relajadas". Esta separación de responsabilidades facilita que diferentes desarrolladores trabajen en distintas partes del sistema simultáneamente sin interferir entre sí.

Aunque son más simples que los microservicios, los sistemas de N-Capas pueden volverse "monolíticos" y difíciles de escalar si no se gestionan con cuidado. Sin embargo, siguen siendo una excelente opción para muchas aplicaciones empresariales donde la simplicidad es prioritaria sobre la escala distribuida masiva.

**Puntos Clave**
*   Proporciona una forma sencilla y bien entendida de separar responsabilidades (UI, lógica, datos) en niveles lógicos o físicos distintos.

**Ejemplo**
Una aplicación web clásica donde la capa de **Controlador** valida la entrada, llama al **Servicio** para aplicar reglas de negocio, y este usa un **DAO** para guardar en la base de datos SQL.

---

## 13. Mensajería (Messaging (Pub Sub) (Routing ETP))
**Descripción**
Publish-Subscribe (Pub-Sub) es un patrón de mensajería donde los "publicadores" envían mensajes a un tema (topic) sin saber quiénes son los "suscriptores". La infraestructura de mensajería se encarga de entregar una copia del mensaje a todas las partes interesadas.

Este patrón es la forma definitiva de desacoplamiento en sistemas distribuidos. Un servicio puede anunciar un cambio al mundo, y cualquier número de otros servicios pueden reaccionar. Esto permite una fácil extensibilidad; se puede añadir un nuevo servicio de log o de analítica solo con suscribirlo al tema relevante.

Los sistemas Pub-Sub a menudo utilizan "Enrutamiento" y "Patrones de Integración Empresarial" (EIP) para asegurar que los mensajes lleguen solo a los destinatarios correctos y con el formato adecuado. Esta infraestructura proporciona el "pegamento" que mantiene unidos a los microservicios modernos.

**Puntos Clave**
*   Permite la comunicación uno-a-muchos y un desacoplamiento extremo al dejar que los servicios transmitan eventos a suscriptores anónimos.

**Ejemplo**
Un sistema de alertas de tráfico. El sensor publica un mensaje en el topic `tráfico-pesado`. De forma simultánea, la **App del usuario** recibe una notificación, el **Panel de la autopista** cambia su mensaje y el **Sistema de estadísticas** guarda el registro.

---

## 14. Ley de Conway (Conway Law)
**Descripción**
La Ley de Conway es una observación que indica que las organizaciones que diseñan sistemas están obligadas a producir diseños que son copias de las estructuras de comunicación de dichas organizaciones. Básicamente, la arquitectura del software reflejará inevitablemente la estructura del equipo.

Si tienes tres equipos trabajando en un sistema, probablemente terminarás con una arquitectura de tres módulos. Reconocer esta ley es crucial para realizar la "Maniobra Inversa de Conway", donde una organización reestructura deliberadamente sus equipos para impulsar la arquitectura de software deseada.

Comprender la Ley de Conway ayuda a los arquitectos a darse cuenta de que los problemas técnicos suelen ser en realidad problemas organizacionales. Si la comunicación entre dos módulos es lenta o propensa a errores, puede ser porque los equipos responsables no se comunican bien.

**Puntos Clave**
*   Destaca que la arquitectura del software es un reflejo de la comunicación del equipo, sugiriendo que la estructura del equipo debe alinearse con el diseño deseado del sistema.

**Ejemplo**
Si el equipo de **Frontend** y el de **Backend** están en edificios distintos y no se hablan, la API resultante probablemente será inconsistente y difícil de usar, reflejando esa falta de comunicación física y social.

---

## 15. Streaming vs Batching (Streaming vs Batching archictecure)
**Descripción**
Las arquitecturas deben elegir entre procesar datos en "lotes" (grandes grupos de datos procesados a intervalos específicos) o "flujos" (datos procesados continuamente a medida que llegan). Cada enfoque tiene ventajas y desventajas en términos de latencia, complejidad y uso de recursos.

El procesamiento por lotes suele ser más eficiente para volúmenes extremadamente grandes de datos históricos donde no se requieren resultados inmediatos (como generar un informe financiero mensual). Es más simple de implementar pero resulta en una "latencia de datos".

La arquitectura de streaming (usando herramientas como Flink o Spark Streaming) proporciona resultados casi en tiempo real, lo que es esencial para la detección de fraudes o el monitoreo en vivo. Sin embargo, requiere una infraestructura más compleja para manejar eventos desordenados.

**Puntos Clave**
*   Equilibra la capacidad de respuesta en tiempo real frente a la eficiencia en volúmenes masivos, determinando con qué rapidez los conocimientos de los datos están disponibles para el negocio.

**Ejemplo**
**Batching**: El banco procesa todos los cheques del día a las 11 PM en un solo proceso. **Streaming**: El mismo banco analiza cada transacción de tarjeta de crédito en milisegundos para detectar si es un posible fraude antes de autorizarla.

---

## 16. Aplicaciones de 12 Factores (Twelve Factor Apps)
**Descripción**
El "Twelve-Factor App" es una metodología para construir software como servicio (SaaS) que sea portátil, resiliente y fácil de escalar en entornos de nube. Proporciona doce mejores prácticas que cubren desde la configuración hasta el estado y el despliegue.

Factores clave incluyen "Configuración", que obliga a almacenar la configuración en el entorno, y "Procesos sin Estado", que asegura que la aplicación pueda escalarse horizontalmente sin preocuparse por datos locales. Estas reglas aseguran que la app sea verdaderamente "nativa de la nube".

Seguir estos doce factores minimiza la divergencia entre entornos y permite la máxima automatización en el despliegue. Es el estándar de oro para el desarrollo de aplicaciones web modernas, asegurando que sean robustas y fáciles de mantener en un mundo de DevOps moderno.

**Puntos Clave**
*   Define un conjunto completo de mejores prácticas para construir aplicaciones de software como servicio escalables, portátiles y mantenibles en la nube.

**Ejemplo**
Aplicar el factor **III. Configuraciones**: No guardar la contraseña de la base de datos en el código, sino leerla de una variable de entorno como `DB_PASSWORD`. Esto permite usar la misma imagen de Docker en Desarrollo, QA y Producción sin cambios.
