# Descripciones de Skills: Patrones de Diseño

Este documento contiene descripciones concisas para cada patrón incluido en el grupo `Design Patterns`. Cada sección ofrece una visión general y puntos clave para entrevistadores y candidatos.

---

## Singleton-CRE
**Descripción**
Asegura que una clase tenga una única instancia y proporciona un punto de acceso global a la misma. Útil para objetos de configuración compartida, pools de conexiones o registries. En contextos concurrentes, la implementación debe resolver seguridad de hilos, inicialización perezosa y serialización.

**Puntos clave**
- Garantiza una única instancia por JVM (no distribuida).
- Implementaciones comunes: enum singleton, holder class, doble-check locking.

---

## FactoryMethod-CRE
**Descripción**
Define una interfaz para crear un objeto pero permite que las subclases decidan qué clase instanciar. El Factory Method encapsula la creación y soporta la extensión adherida al principio Open/Closed.

**Puntos clave**
- Desacopla el código cliente de clases concretas.
- Promueve extensibilidad por medio de subclases o registro de fábricas.

---

## AbstractFactory-CRE
**Descripción**
Proporciona una interfaz para crear familias de objetos relacionados sin especificar sus clases concretas. Garantiza compatibilidad entre productos y centraliza la lógica de creación.

**Puntos clave**
- Útil cuando varios productos relacionados deben usarse juntos.
- Añade sobrecarga estructural (múltiples clases de fábrica).

---

## Builder-CRE
**Descripción**
Separa la construcción de un objeto complejo de su representación, permitiendo construir paso a paso y mantener un código cliente legible. Útil para objetos con muchos parámetros opcionales o invariantes complejos.

**Puntos clave**
- Mejora legibilidad frente a constructores telescópicos.
- Funciona bien con objetos inmutables.

---

## Prototype-CRE
**Descripción**
Crea nuevas instancias mediante clonación de un prototipo existente, lo que puede ser más eficiente cuando la construcción es costosa. Se debe manejar con cuidado la copia superficial vs profunda cuando existen referencias a estado mutable.

**Puntos clave**
- Eficiente para inicializaciones costosas.
- Definir claramente la semántica de clonación (shallow/deep).

---

## Adapter-ST
**Descripción**
Convierte la interfaz de una clase en otra que los clientes esperan. El Adapter permite que clases incompatibles cooperen envolviendo al adaptado.

**Puntos clave**
- Útil para integrar código legado o APIs de terceros.
- Preferir adapter por composición cuando sea posible.

---

## Decorator-ST
**Descripción**
Añade responsabilidades a objetos dinámicamente sin modificar su código, envolviéndolos en objetos decoradores que implementan la misma interfaz.

**Puntos clave**
- Permite composición flexible de comportamientos en tiempo de ejecución.
- Evitar cadenas largas de wrappers que dificulten el debugging.

---

## Proxy-ST
**Descripción**
Actúa como sustituto o representante de otro objeto para controlar el acceso, añadir comportamiento (caching, logging, seguridad) o gestionar la adquisición de recursos (lazy loading).

**Puntos clave**
- Usos comunes: lazy loading, proxies remotos, protection proxies.
- Puede implementarse con proxies dinámicos en muchos lenguajes.

---

## Facade-ST
**Descripción**
Ofrece una interfaz simplificada y de alto nivel a un subsistema complejo, reduciendo el acoplamiento entre el cliente y los detalles del subsistema.

**Puntos clave**
- Simplifica el uso de un subsistema.
- Mantener la API de la fachada pequeña y estable.

---

## Composite-ST
**Descripción**
Compone objetos en estructuras de árbol para representar jerarquías parte-todo y permite que clientes traten por igual objetos individuales y composiciones.

**Puntos clave**
- Habilita operaciones uniformes sobre hojas y nodos compuestos.
- Considerar recorrido y concurrencia para árboles grandes.

---

## Observer-COM
**Descripción**
Define una dependencia uno-a-muchos de manera que cuando un objeto cambia su estado, todos los dependientes son notificados y actualizados automáticamente. Útil en diseños basados en eventos o reactivos.

**Puntos clave**
- Desacopla sujeto y observadores.
- Gestionar registros para evitar fugas de memoria.

---

## Strategy-COM
**Descripción**
Encapsula algoritmos intercambiables en objetos estrategia, permitiendo que el algoritmo varíe independientemente del cliente.

**Puntos clave**
- Promueve el principio Open/Closed; se pueden añadir estrategias sin modificar clientes.
- Registrar o inyectar estrategias para selección en tiempo de ejecución.

---

## Command-COM
**Descripción**
Encapsula una petición como un objeto, permitiendo parametrizar clientes con diferentes peticiones, encolado, registro y soporte para operaciones undo.

**Puntos clave**
- Útil para colas, logging y undo/redo.
- Diseñar comandos idempotentes para reintentos seguros.

---

## Chain of Responsibility-COM
**Descripción**
Pasa una petición a lo largo de una cadena de handlers; cada handler decide procesarla o pasarla al siguiente. Reduce el acoplamiento entre emisor y receptores.

**Puntos clave**
- Permite asignación flexible de responsabilidad.
- Proveer un handler por defecto para peticiones no gestionadas.

