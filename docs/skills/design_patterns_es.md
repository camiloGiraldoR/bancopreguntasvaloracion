# Descripciones de Skills: Patrones de Diseño

Este documento contiene descripciones concisas para cada patrón incluido en el grupo `Design Patterns`. Cada sección ofrece una visión general y puntos clave para entrevistadores y candidatos.

---

## Singleton-CRE
**Descripción**
Asegura que una clase tenga una única instancia y proporciona un punto de acceso global a la misma. Útil para objetos de configuración compartida, pools de conexiones o registries. En contextos concurrentes, la implementación debe resolver seguridad de hilos, inicialización perezosa y serialización.

**Ejemplo Real**
Un sistema de logging en una aplicación bancaria. Necesitas una única instancia de Logger que escriba todos los eventos al mismo archivo de log. Usar Singleton asegura que todas las clases de la aplicación escriban al mismo logger sin crear múltiples instancias que causarían bloqueos de archivo o pérdida de mensajes.

**Puntos clave**
- Garantiza una única instancia por JVM (no distribuida).
- Implementaciones comunes: enum singleton, holder class, doble-check locking.

---

## FactoryMethod-CRE
**Descripción**
Define una interfaz para crear un objeto pero permite que las subclases decidan qué clase instanciar. El Factory Method encapsula la creación y soporta la extensión adherida al principio Open/Closed.

**Ejemplo Real**
Un sistema de procesamiento de documentos que debe soportar diferentes formatos de archivo (PDF, Word, Excel). En lugar de que el cliente decida qué DocumentFactory usar, cada tipo de documento tiene su propia fábrica. Cuando añades un nuevo formato como PowerPoint, simplemente creas una nueva fábrica concreta sin cambiar código existente.

**Puntos clave**
- Desacopla el código cliente de clases concretas.
- Promueve extensibilidad por medio de subclases o registro de fábricas.

---

## AbstractFactory-CRE
**Descripción**
Proporciona una interfaz para crear familias de objetos relacionados sin especificar sus clases concretas. Garantiza compatibilidad entre productos y centraliza la lógica de creación.

**Ejemplo Real**
Un framework de UI que debe soportar múltiples temas (Tema Claro y Tema Oscuro). Cada tema necesita componentes coincidentes: Button, TextBox y Dialog. AbstractFactory asegura que cuando seleccionas un tema, todos los componentes de UI se crean en ese tema—nunca mezclarás un Button Claro con un TextBox Oscuro.

**Puntos clave**
- Útil cuando varios productos relacionados deben usarse juntos.
- Añade sobrecarga estructural (múltiples clases de fábrica).

---

## Builder-CRE
**Descripción**
Separa la construcción de un objeto complejo de su representación, permitiendo construir paso a paso y mantener un código cliente legible. Útil para objetos con muchos parámetros opcionales o invariantes complejos.

**Ejemplo Real**
Crear un objeto HttpRequest con muchas opciones: headers, body, autenticación, timeouts, etc. En lugar de un constructor con 20 parámetros, usas un Builder: new RequestBuilder().url("http://...").header("Auth", token).timeout(5000).reintentos(3).build(). Es mucho más claro y permite componer requests complejos paso a paso.

**Puntos clave**
- Mejora legibilidad frente a constructores telescópicos.
- Funciona bien con objetos inmutables.

---

## Prototype-CRE
**Descripción**
Crea nuevas instancias mediante clonación de un prototipo existente, lo que puede ser más eficiente cuando la construcción es costosa. Se debe manejar con cuidado la copia superficial vs profunda cuando existen referencias a estado mutable.

**Ejemplo Real**
Una aplicación de diseño gráfico donde los usuarios crean gráficos complejos con muchas propiedades. En lugar de recrear desde cero cada vez, clonas una plantilla gráfica preconfigurada. Si tienes un prototipo de "Rectángulo Redondeado" con colores, sombras y efectos específicos ya definidos, clonarlo es mucho más rápido que reaplicar todas las propiedades manualmente.

**Puntos clave**
- Eficiente para inicializaciones costosas.
- Definir claramente la semántica de clonación (shallow/deep).

---

## Adapter-ST
**Descripción**
Convierte la interfaz de una clase en otra que los clientes esperan. El Adapter permite que clases incompatibles cooperen envolviendo al adaptado.

**Ejemplo Real**
Tienes un sistema legado antiguo con un LegacyPaymentProcessor que usa una interfaz obsoleta. Tu nuevo sistema espera una interfaz PaymentGateway. En lugar de reescribir el sistema legado, creas un PaymentAdapter que lo envuelve y traduce llamadas: el código nuevo llama adapter.processPayment(), que internamente llama al oldProcess() del procesador legado.

**Puntos clave**
- Útil para integrar código legado o APIs de terceros.
- Preferir adapter por composición cuando sea posible.

---

## Decorator-ST
**Descripción**
Añade responsabilidades a objetos dinámicamente sin modificar su código, envolviéndolos en objetos decoradores que implementan la misma interfaz.

**Ejemplo Real**
Un sistema de pedidos de café. Comienzas con un objeto Coffee base. En tiempo de ejecución, clientes pueden añadir características: new CaneladorDecorador(new CremaBatidaDecorador(new LecheDecorador(café))). Cada decorador envuelve el anterior, añadiendo precio y descripción. Esto evita crear clases separadas para CaféConLeche, CaféConCanela, CaféConLecheYCanela.

**Puntos clave**
- Permite composición flexible de comportamientos en tiempo de ejecución.
- Evitar cadenas largas de wrappers que dificulten el debugging.

---

## Proxy-ST
**Descripción**
Actúa como sustituto o representante de otro objeto para controlar el acceso, añadir comportamiento (caching, logging, seguridad) o gestionar la adquisición de recursos (lazy loading).

**Ejemplo Real**
Cargar una imagen de alta resolución desde un servidor remoto es lento. En lugar de cargar inmediatamente, creas un ImageProxy que aparenta ser idéntico a la imagen real. Cuando el cliente realmente la usa, el proxy carga la imagen real en segundo plano, cacheándola para accesos futuros. El código cliente permanece inconsciente de este mecanismo de lazy-loading.

**Puntos clave**
- Usos comunes: lazy loading, proxies remotos, protection proxies.
- Puede implementarse con proxies dinámicos en muchos lenguajes.

---

## Facade-ST
**Descripción**
Ofrece una interfaz simplificada y de alto nivel a un subsistema complejo, reduciendo el acoplamiento entre el cliente y los detalles del subsistema.

**Ejemplo Real**
El proceso de hipoteca de un banco involucra muchos subsistemas: verificación de crédito, verificación de ingresos, procesamiento de documentos, tasación, seguros. En lugar de que el cliente interactúe con cada subsistema, creas un LoanFacade que expone un simple método applyForLoan(), ocultando internamente la compleja orquestación de todos esos subsistemas.

**Puntos clave**
- Simplifica el uso de un subsistema.
- Mantener la API de la fachada pequeña y estable.

---

## Composite-ST
**Descripción**
Compone objetos en estructuras de árbol para representar jerarquías parte-todo y permite que clientes traten por igual objetos individuales y composiciones.

**Ejemplo Real**
Un sistema de archivos donde una carpeta puede contener archivos u otras carpetas (subcarpetas). Usando Composite, tanto File como Folder implementan una interfaz común. Un cliente puede llamar getSize() en cualquiera—un File retorna su tamaño, una Folder suma recursivamente los tamaños de todos los hijos. Los clientes no distinguen entre archivos individuales y árboles de directorios complejos.

**Puntos clave**
- Habilita operaciones uniformes sobre hojas y nodos compuestos.
- Considerar recorrido y concurrencia para árboles grandes.

---

## Observer-COM
**Descripción**
Define una dependencia uno-a-muchos de manera que cuando un objeto cambia su estado, todos los dependientes son notificados y actualizados automáticamente. Útil en diseños basados en eventos o reactivos.

**Ejemplo Real**
Un sistema de ticker de precios de acciones. Cuando el precio de una acción cambia, múltiples partes interesadas (traders, gerentes de riesgo, servicio de notificaciones) necesitan ser informadas inmediatamente sin que el sistema de cotizaciones conozca de ellas. El ticker notifica a todos los observadores registrados, y cada uno maneja la actualización a su manera.

**Puntos clave**
- Desacopla sujeto y observadores.
- Gestionar registros para evitar fugas de memoria.

---

## Strategy-COM
**Descripción**
Encapsula algoritmos intercambiables en objetos estrategia, permitiendo que el algoritmo varíe independientemente del cliente.

**Ejemplo Real**
Un sistema de checkout de e-commerce calcula costos de envío diferente según la estrategia seleccionada: StandardShipping (tarifa fija), ExpressShipping (basado en peso) o FreeShipping (para órdenes sobre umbral). El pedido no importa qué estrategia se usa; simplemente llama strategy.calculateCost(). Se pueden añadir nuevas estrategias sin tocar la clase Order.

**Puntos clave**
- Promueve el principio Open/Closed; se pueden añadir estrategias sin modificar clientes.
- Registrar o inyectar estrategias para selección en tiempo de ejecución.

---

## Command-COM
**Descripción**
Encapsula una petición como un objeto, permitiendo parametrizar clientes con diferentes peticiones, encolado, registro y soporte para operaciones undo.

**Ejemplo Real**
Un editor de texto donde cada acción del usuario (escribir, eliminar, formatear) es un objeto Command. El editor mantiene un historial de comandos y puede deshacer/rehacer llamando a los métodos undo() o redo() de comandos anteriores. Una característica de macro puede encolar comandos para ejecución en lote, y todas las operaciones se registran para auditoría.

**Puntos clave**
- Útil para colas, logging y undo/redo.
- Diseñar comandos idempotentes para reintentos seguros.

---

## Chain of Responsibility-COM
**Descripción**
Pasa una petición a lo largo de una cadena de handlers; cada handler decide procesarla o pasarla al siguiente. Reduce el acoplamiento entre emisor y receptores.

**Ejemplo Real**
Un sistema de tickets de soporte donde solicitudes fluyen a través de handlers: SoportePrimeraLinea → SoporteEspecialista → Gerente. Un ticket pidiendo reiniciar un servicio puede resolverlo SoportePrimeraLinea. Un problema técnico complejo se pasa a SoporteEspecialista. Decisiones de gestión van al Gerente. Cada handler en la cadena decide manejar o delegar sin que el cliente conozca la estructura.

**Puntos clave**
- Permite asignación flexible de responsabilidad.
- Proveer un handler por defecto para peticiones no gestionadas.

