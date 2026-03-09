# Descripciones de Habilidades: Cloud para Desarrolladores

Este documento cubre las habilidades esenciales nativas de la nube, enfocándose en pipelines de entrega, seguridad, componentes de infraestructura y servicios específicos de la nube.

---

## 1. CI/CD - Scripting (CI/CD - Scripting)
**Descripción**
La Integración Continua (CI) y el Despliegue Continuo (CD) son prácticas que automatizan la construcción, prueba y despliegue de software. El scripting es el motor detrás de estos pipelines, utilizando herramientas como Bash, Python o sintaxis especializadas en YAML para orquestar flujos de trabajo complejos.

Un pipeline de CI/CD bien diseñado asegura que cada cambio de código sea verificado, versionado y esté listo para producción automáticamente. Esto reduce los errores manuales y permite a los equipos entregar valor de forma más rápida y con mayor confianza en la estabilidad del sistema.

El scripting permite lógica personalizada dentro de estos pipelines, como configuraciones específicas por entorno, escaneos de seguridad especializados o sistemas de notificación a medida. Dominar estos scripts es una habilidad central para cualquier desarrollador moderno en una organización orientada a DevOps.

**Puntos Clave**
*   Automatiza el ciclo de vida del software mediante flujos de trabajo scriptados, asegurando una entrega consistente, frecuente y fiable de código de alta calidad.

**Ejemplo**
Un archivo `.github/workflows/deploy.yml` que usa **GitHub Actions**. El script detecta un "push" a la rama `main`, ejecuta `npm test`, construye la imagen de Docker y la sube a **AWS ECR**.

---

## 2. Seguridad AEM Forms (AEM Forms Security (PII etc...))
**Descripción**
La seguridad en los servicios de nube, particularmente al manejar Información de Identificación Personal (PII) en plataformas como Adobe Experience Manager (AEM) Forms, es una preocupación crítica. Implica implementar cifrado estricto, controles de acceso y enmascaramiento de datos para proteger la información sensible del usuario.

Los desarrolladores deben asegurar que los datos estén cifrados tanto en reposo como en tránsito. Esto también incluye cumplir con estándares legales (como GDPR o HIPAA) e implementar un registro y monitoreo robustos para detectar cualquier acceso no autorizado o brecha de datos en tiempo real.

La gestión adecuada de la seguridad en AEM Forms también requiere un conocimiento profundo de los modelos de permisos y del principio de "mínimo privilegio". Esto garantiza que los usuarios y servicios solo tengan acceso a los datos y funciones específicos necesarios para sus roles.

**Puntos Clave**
*   Protege los datos sensibles del usuario (PII) mediante cifrado, control de acceso riguroso y prácticas de seguridad basadas en el cumplimiento normativo en plataformas de nube.

**Ejemplo**
Configurar un formulario de solicitud de crédito donde el número de identificación se guarda cifrado usando **AWS KMS** y solo es visible de forma parcial (enmascarada) para los agentes de soporte de nivel 1.

---

## 3. Cómputo - VMs, Contenedores, Lambdas (Compute (Vms, Containers, Lambdas, Webaaps, Beanstalk))
**Descripción**
Los proveedores de nube ofrecen varias opciones de "Cómputo" adaptadas a diferentes necesidades arquitectónicas. Estas varían desde Máquinas Virtuales (VMs) tradicionales para un control máximo, hasta Lambdas sin servidor para funciones dirigidas por eventos y plataformas gestionadas como AWS Elastic Beanstalk para facilitar el despliegue.

Elegir el servicio de cómputo adecuado depende de factores como los requisitos de escalabilidad, la sobrecarga de gestión y el costo. Los contenedores (como ECS o EKS) ofrecen un equilibrio entre portabilidad y control, mientras que los servicios de Web Apps proporcionan un entorno totalmente gestionado para servicios web.

Los desarrolladores modernos deben entender las ventajas y desventajas de cada modelo. Por ejemplo, mientras que las VMs ofrecen control total del SO, requieren un mantenimiento significativo, mientras que las Lambdas escalan automáticamente pero tienen límites de tiempo de ejecución y consideraciones de arranque en frío.

**Puntos Clave**
*   Proporciona una gama diversa de entornos de ejecución, desde el control total de la infraestructura hasta funciones serverless gestionadas, para satisfacer necesidades operativas y de escalado específicas.

**Ejemplo**
Usar **AWS Fargate** para correr un microservicio de Java en un contenedor Docker. No tienes que gestionar la instancia de EC2 subyacente, solo defines cuánta CPU y Memoria necesita tu aplicación.

---

## 4. Bases de Datos, Mensajería y Monitoreo (Databases - Messaging - Events - Monitoring)
**Descripción**
El ecosistema de la nube incluye servicios especializados para el almacenamiento de datos, la comunicación y la salud del sistema. Las bases de datos en la nube (SQL y NoSQL) ofrecen alta disponibilidad, mientras que la mensajería (SQS) y los servicios de eventos (EventBridge) permiten una comunicación asíncrona y desacoplada.

El monitoreo y la observabilidad son esenciales para mantener estos sistemas distribuidos. Servicios como CloudWatch o Datadog proporcionan métricas en tiempo real, registros (logs) y trazas, permitiendo a los desarrolladores identificar cuellos de botella y solucionar problemas antes de que afecten a los usuarios.

Integrar estos servicios correctamente asegura que la aplicación sea no solo funcional, sino también resiliente y de alto rendimiento. Por ejemplo, usar una cola de mensajes puede suavizar los picos de tráfico, mientras que un monitoreo robusto proporciona los datos necesarios para decisiones de escalado automático.

**Puntos Clave**
*   Integra servicios de infraestructura esenciales para la gestión de estado, comunicación y observabilidad del sistema, asegurando una alta fiabilidad y excelencia operativa.

**Ejemplo**
Un sistema de alertas que guarda registros en **Amazon DynamoDB**, envía notificaciones de error a una cola de **Amazon SQS** y dispara una alarma en **CloudWatch** si el tiempo de respuesta supera los 2 segundos.

---

## 5. Conceptos Básicos de Redes (Network Basics & Components)
**Descripción**
Las redes en la nube forman la columna vertebral de una arquitectura segura y eficiente. Los componentes clave incluyen Nubes Privadas Virtuales (VPCs), Subredes, Tablas de Rutas y Balanceadores de Carga, que controlan cómo fluye el tráfico entre los servicios y la internet pública.

Los Grupos de Seguridad (Security Groups) y las Listas de Control de Acceso a la Red (NACLs) actúan como firewalls virtuales, restringiendo el tráfico basado en protocolos, puertos y direcciones IP. Dominar estos componentes es esencial para implementar una estrategia de "Defensa en Profundidad".

Un diseño de red adecuado también mejora el rendimiento mediante un enrutamiento optimizado y la localización del tráfico dentro de las regiones. Los balanceadores de carga mejoran aún más la disponibilidad al distribuir el tráfico entre múltiples instancias saludables de un servicio.

**Puntos Clave**
*   Gestiona el flujo seguro y eficiente de datos entre servicios de nube utilizando componentes de red estructurados como VPCs, subredes y firewalls.

**Ejemplo**
Colocar la base de datos en una **Subred Privada** sin acceso directo a internet, y permitir el tráfico solo desde el **Security Group** de la aplicación web que reside en la subred pública.

---

## 6. Almacenamiento (Storage (buckets))
**Descripción**
El almacenamiento de objetos en la nube, comúnmente llamado "Buckets" (ej. AWS S3, Google Cloud Storage), proporciona un almacenamiento altamente duradero y escalable para datos no estructurados como imágenes, registros y copias de seguridad. Está diseñado para ser accesible desde cualquier lugar mediante APIs web.

A diferencia del almacenamiento de bloques tradicional, el almacenamiento de objetos está optimizado para la escala en lugar de operaciones de sistema de archivos de baja latencia. Incluye características como versionamiento, políticas de ciclo de vida (para mover datos viejos a niveles de almacenamiento más baratos) y control de acceso detallado.

Los Buckets se utilizan a menudo como el "lago de datos" (data lake) en arquitecturas modernas, sirviendo como la fuente de verdad para analítica, alojamiento de sitios web estáticos y pipelines de procesamiento de datos a gran escala. Su capacidad virtualmente infinita los convierte en una piedra angular de la infraestructura cloud.

**Puntos Clave**
*   Ofrece almacenamiento altamente escalable y duradero para datos no estructurados, con gestión automatizada del ciclo de vida y controles de acceso robustos basados en web.

**Ejemplo**
Configurar un bucket de **Amazon S3** para que todas las fotos subidas por los usuarios se muevan automáticamente a **S3 Glacier** (almacenamiento de bajo costo) después de 90 días de inactividad.
