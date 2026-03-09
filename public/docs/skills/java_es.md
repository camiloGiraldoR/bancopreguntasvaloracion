# Descripciones de Habilidades: Grupo Java

Este documento proporciona una visión detallada de las habilidades técnicas principales para el grupo de Java en la aplicación de valoración de Perficient. Cada habilidad incluye una descripción, puntos clave y un ejemplo práctico.

---

## 1. Tipos y Wrappers (Types and Wrappers)
**Descripción**
Java distingue entre tipos primitivos (como `int`, `double`) y sus correspondientes clases Wrapper (como `Integer`, `Double`). Los primitivos son eficientes porque almacenan valores directamente en la pila (stack), mientras que los Wrappers son objetos almacenados en el montón (heap), lo que les permite ser `null` y ser usados en colecciones genéricas.

Comprender esta diferencia es crucial para la gestión de memoria y el rendimiento, especialmente en bucles de alta carga donde el proceso de boxing/unboxing puede generar sobrecarga. Las versiones modernas de Java manejan la conversión entre ellos automáticamente mediante Autoboxing y Unboxing.

La clase `Integer` incluye un caché (normalmente de -128 a 127) para optimizar la memoria reutilizando objetos comunes. Usar `valueOf()` en lugar de `new` asegura que se utilice este caché correctamente.

**Puntos Clave**
*   Los primitivos son basados en valor y no pueden ser nulos; los Wrappers son objetos, soportan nulos y son obligatorios para usar en las Colecciones de Java.

**Ejemplo**
```java
// Uso de primitivo para rendimiento
int edad = 25; 

// Uso de Wrapper para colecciones y nulidad
List<Integer> notas = new ArrayList<>();
notas.add(null); 
notas.add(Integer.valueOf(10)); // Uso de caché
```

---

## 2. Coincidencia de Patrones (Pattern Matching)
**Descripción**
La coincidencia de patrones en Java simplifica el código al combinar la comprobación de tipo y la extracción de variables en un solo paso. Introducido originalmente para `instanceof`, elimina la necesidad de realizar conversiones explícitas (casts) que suelen ser propensas a errores.

Esta característica ha evolucionado para soportar expresiones `switch`, permitiendo a los desarrolladores coincidir directamente con tipos y aplicar filtros adicionales usando la cláusula `when`. Esto resulta en un flujo de control más legible y declarativo.

Los usos avanzados incluyen Patrones de Record, que permiten deconstruir registros de datos directamente dentro de la lógica de coincidencia. Esto facilita un estilo de programación más funcional.

**Puntos Clave**
*   Simplifica la comprobación y extracción de tipos eliminando conversiones manuales y permitiendo una lógica exhaustiva en expresiones switch.

**Ejemplo**
```java
// Antes (Java 8)
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Ahora (Java 17+)
if (obj instanceof String s) {
    System.out.println(s.length());
}
```

---

## 3. Cierre de recursos con Try-catch (Try catch closing resources)
**Description**
La gestión de recursos se maneja de forma segura utilizando la sentencia Try-with-resources (TWR). Esta sintaxis asegura que los objetos que implementan la interfaz `AutoCloseable` (como flujos de archivos o conexiones a bases de datos) se cierren automáticamente al final del bloque.

TWR es superior al bloque `finally` tradicional porque es más limpio y maneja correctamente las "excepciones suprimidas" que podrían ocurrir durante el proceso de cierre sin ocultar la excepción principal.

Cuando se declaran múltiples recursos en una sola sentencia TWR, estos se cierran en el orden inverso a su declaración, asegurando que los recursos secundarios se cierren antes que sus dependencias.

**Puntos Clave**
*   Garantiza el cierre automático y ordenado de recursos, previniendo fugas de memoria y mejorando la transparencia de las excepciones.

**Ejemplo**
```java
try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    e.printStackTrace();
} // El BufferedReader se cierra automáticamente aquí
```

---

## 4. Typescript | Objetos, Clases e Interfaces (Typescript | Objects, Classes and Interfaces)
**Descripción**
Aunque es un grupo enfocado en Java, entender las características orientadas a objetos de TypeScript es esencial para desarrolladores full-stack. TypeScript proporciona `Interface` y `Type` para definir la forma de los objetos, permitiendo que las interfaces soporten la "fusión de declaraciones" para su extensibilidad.

Las clases en TypeScript soportan modificadores estándares como `public`, `private` y `protected`, que controlan el acceso durante el desarrollo. Estas características ayudan a imponer límites arquitectónicos similares a la encapsulación de Java.

Conceptos avanzados como Uniones Discriminadas y Tipos Mapeados permiten transformaciones de tipos potentes y un manejo de datos más seguro al aprovechar tipos literales como identificadores únicos.

**Puntos Clave**
*   Impone estructura y seguridad en el desarrollo web mediante definiciones de tipos rigurosas y principios orientados a objetos.

**Ejemplo**
```typescript
interface User {
    id: number;
    name: string;
}

class UserService {
    private users: User[] = [];
    
    public addUser(user: User): void {
        this.users.push(user);
    }
}
```

---

## 5. Nulidad y Opcional (null and optional)
**Descripción**
La clase `Optional<T>` fue introducida para proporcionar una forma más expresiva de manejar valores que podrían estar ausentes, reduciendo la frecuencia de `NullPointerException`. Obliga a los desarrolladores a manejar explícitamente el caso "vacío".

Métodos como `ofNullable()` permiten la creación segura a partir de valores potencialmente nulos, mientras que `orElseGet()` proporciona una forma perezosa (lazy) de manejar valores predeterminados. El uso adecuado implica evitar `Optional` en campos o parámetros para minimizar la sobrecarga de memoria.

en escenarios de alto rendimiento o flujos de datos masivos, las comprobaciones de nulos tradicionales pueden ser preferibles debido a la sobrecarga de asignación de objetos causada por envolver cada valor en un `Optional`.

**Puntos Clave**
*   Promueve el manejo explícito de valores ausentes mediante una API basada en contenedores, aunque debe usarse con juicio para evitar cuellos de botella de rendimiento.

**Ejemplo**
```java
Optional<String> name = Optional.ofNullable(getUserName());
String displayName = name.map(String::toUpperCase)
                         .orElse("ANÓNIMO");
```

---

## 6. Java Time (API de Tiempo)
**Descripción**
La API `java.time` (JSR-310) proporciona un marco completo y seguro para hilos (thread-safe) para la manipulación de fechas y horas. A diferencia de las clases legadas `Date` y `Calendar`, la nueva API es inmutable.

La API separa el "tiempo humano" (ej. `LocalDate`, `LocalDateTime`) del "tiempo de máquina" (`Instant`). También incluye un soporte robusto para zonas horarias a través de `ZonedDateTime` y `OffsetDateTime`.

Manejar diferencias de tiempo es sencillo con `Period` para escalas humanas (días, meses) y `Duration` para alta precisión (segundos, nanosegundos).

**Puntos Clave**
*   Proporciona una solución moderna, inmutable y segura para hilos para gestionar lógica temporal compleja y conversiones de zonas horarias.

**Ejemplo**
```java
LocalDate today = LocalDate.now();
LocalDate nextWeek = today.plusDays(7);
Duration timeout = Duration.ofMinutes(5);
```

---

## 7. Palabras Clave y Sintaxis (Keywords and syntaxis)
**Descripción**
La sintaxis de Java se basa en un conjunto específico de palabras clave que definen el comportamiento y la visibilidad. Palabras clave como `transient` evitan la serialización de campos, mientras que `volatile` asegura la visibilidad de memoria entre diferentes hilos.

Los modificadores como `final` se usan para crear constantes o prevenir la herencia, mientras que `synchronized` proporciona sincronización básica de hilos bloqueando el monitor de un objeto.

Adiciones modernas como los métodos `default` en interfaces permiten evolucionar las APIs sin romper las implementaciones existentes, soportando una mejor retrocompatibilidad en librerías de gran escala.

**Puntos Clave**
*   Define las reglas fundamentales del lenguaje, gobernando desde la visibilidad de memoria hasta las limitaciones arquitectónicas y la evolución de APIs.

**Ejemplo**
```java
public class Config {
    public static final String VERSION = "1.0"; // Constante
    private transient String sessionToken; // No se serializa
    
    public synchronized void update() { /* ... */ }
}
```

---

## 8. Hilos (Threads)
**Descripción**
Java proporciona capacidades potentes de multi-hilo, permitiendo que las aplicaciones realicen tareas concurrentes. Los hilos pueden gestionarse directamente a través de la clase `Thread` o de manera más eficiente mediante el framework `Executor`.

La concurrencia introduce riesgos como Condiciones de Carrera (Race Conditions), donde los hilos chocan por datos compartidos, y Bloqueos Mutuos (Deadlocks), donde los hilos esperan indefinidamente el uno al otro. La sincronización adecuada es clave para prevenir esto.

Java 21 introdujo los Hilos Virtuales (Virtual Threads), que son ligeros y gestionados por la JVM. Estos permiten una escalabilidad masiva al soportar millones de tareas concurrentes con una sobrecarga mínima en comparación con los hilos del sistema operativo.

**Puntos Clave**
*   Permite la ejecución paralela y la escalabilidad, evolucionando de la gestión manual de hilos a modelos sofisticados y ligeros de concurrencia.

**Ejemplo**
```java
// Hilo tradicional
Thread t = new Thread(() -> System.out.println("Corriendo"));
t.start();

// Hilos virtuales (Java 21+)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> System.out.println("Hola desde un hilo virtual"));
}
```

---

## 9. Funciones y Lambdas (Functions and Lambdas)
**Descripción**
La programación funcional en Java se centra en las Interfaces Funcionales: interfaces con un solo método abstracto. Las expresiones Lambda proporcionan una forma concisa de implementar estas interfaces como funciones anónimas.

Las lambdas facilitan la iteración interna de colecciones y son la base de la API de Streams. Pueden capturar variables de su entorno, siempre que dichas variables sean "efectivamente finales".

Las referencias a métodos (`::`) simplifican aún más la sintaxis al permitir que los métodos existentes se pasen directamente como implementaciones funcionales, mejorando la legibilidad y el mantenimiento del código.

**Puntos Clave**
*   Introduce paradigmas funcionales en Java, permitiendo un código más limpio y expresivo mediante funciones anónimas concisas y referencias a métodos.

**Ejemplo**
```java
List<String> names = Arrays.asList("Ana", "Bob", "Carlos");
names.forEach(n -> System.out.println(n)); // Lambda
names.forEach(System.out::println); // Referencia a método
```

---

## 10. Records
**Descripción**
Los Records son un tipo especial de clase en Java diseñado principalmente para actuar como portadores de datos transparentes. Generan automáticamente código redundante (boilerplate) como constructores, accesores, `equals()`, `hashCode()` y `toString()`.

Al ser implícitamente finales y tener componentes inmutables, los records promueven un manejo de datos más seguro y son ideales para DTOs (Data Transfer Objects) y estructuras de datos simples.

Aunque los records son inmutables superficialmente, aún pueden contener colecciones mutables. Soportan constructores compactos para la validación de datos antes de que el estado sea finalizado.

**Puntos Clave**
*   Reduce el código redundante y enfatiza la inmutabilidad para clases centradas en datos, haciéndolas ideales para patrones arquitectónicos modernos.

**Ejemplo**
```java
public record User(Long id, String username) {
    public User { // Constructor compacto para validación
        if (id < 0) throw new IllegalArgumentException("ID inválido");
    }
}
```

---

## 11. Genéricos (Generics)
**Descripción**
Los genéricos proporcionan seguridad de tipos en tiempo de compilación al permitir que las clases, interfaces y métodos sean parametrizados con tipos. Esto evita la excepción `ClassCastException` y reduce la necesidad de conversiones explícitas.

El concepto de Borrado de Tipos (Type Erasure) significa que la información de tipos genéricos se elimina durante la compilación para asegurar la compatibilidad con versiones antiguas de Java. Esto conlleva ciertas limitaciones, como la imposibilidad de crear arrays de tipos genéricos.

Los comodines restringidos (Bounded Wildcards - `extends` y `super`) ofrecen flexibilidad en cómo se pueden usar los tipos genéricos, soportando covarianza (lectura) y contravarianza (escritura) respectivamente.

**Puntos Clave**
*   Garantiza la integridad de tipos durante el desarrollo mientras mantiene la compatibilidad mediante el borrado de tipos y restricciones flexibles de comodines.

**Ejemplo**
```java
public class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

Box<String> stringBox = new Box<>();
stringBox.set("Hola"); // Tipado seguro
```

---

## 12. API de Concurrencia (API Concurrent)
**Descripción**
El paquete `java.util.concurrent` ofrece utilidades de alto nivel para construir aplicaciones multi-hilo. El `ExecutorService` simplifica la ejecución de tareas gestionando pools de hilos y su ciclo de vida.

La concurrencia basada en futuros ha evolucionado desde la interfaz bloqueante `Future` hacia la más flexible y funcional `CompletableFuture`, que permite encadenar tareas de forma no bloqueante y realizar acciones compuestas.

Las primitivas de sincronización avanzada como `ReentrantLock` y las variables atómicas (ej. `AtomicInteger`) proporcionan un control más fino que la palabra clave estándar `synchronized`, optimizando el rendimiento en entornos competitivos.

**Puntos Clave**
*   Proporciona herramientas y abstracciones robustas para gestionar flujos de trabajo asíncronos complejos y estructuras de datos concurrentes de alto rendimiento.

**Ejemplo**
```java
CompletableFuture.supplyAsync(() -> "Tarea 1")
    .thenApply(s -> s + " terminada")
    .thenAccept(System.out::println);
```

---

## 13. Excepciones (Exceptions)
**Descripción**
Java utiliza una jerarquía estructurada para el manejo de errores, basada en la clase `Throwable`. Distingue entre Excepciones Verificadas (Checked - deben ser manejadas) y Excepciones No Verificadas (Unchecked - errores en tiempo de ejecución).

Un manejo adecuado implica capturar excepciones específicas en lugar de tipos genéricos como `Throwable` o `Error`, los cuales generalmente deben dejarse para que la JVM los maneje en caso de fallos fatales.

El encadenamiento de excepciones permite a los desarrolladores envolver un error de bajo nivel en una excepción de alto nivel preservando la causa original, lo cual es esencial para una depuración y registro (logging) efectivos.

**Puntos Clave**
*   Orquestación del manejo de errores a través de una jerarquía rigurosa, enfatizando el reporte claro y la preservación de los contextos de fallo.

**Ejemplo**
```java
try {
    procesarArchivo();
} catch (FileNotFoundException e) {
    throw new CustomException("Error de negocio", e); // Encadenamiento
}
```

---

## 14. Sobrescritura (Overriding)
**Descripción**
La sobrescritura de métodos permite que una subclase proporcione una implementación específica de un método que ya está definido en su superclase. Este es un pilar fundamental del polimorfismo en tiempo de ejecución.

La anotación `@Override` es altamente recomendada ya que indica al compilador que verifique la firma del método, previniendo errores sutiles causados por errores tipográficos o parámetros incorrectos.

Las reglas para la sobrescritura incluyen mantener o aumentar la visibilidad del método y asegurar que el tipo de retorno sea compatible (se permiten tipos de retorno covariantes).

**Puntos Clave**
*   Permite un comportamiento dinámico al dejar que las subclases redefinan métodos heredados, soportando el principio Open/Closed del diseño de software.

**Ejemplo**
```java
class Animal {
    void speak() { System.out.println("Sonido"); }
}

class Perro extends Animal {
    @Override
    void speak() { System.out.println("Guau"); }
}
```

---

## 15. Características de Java 17 (Java 17 Features)
**Descripción**
Java 17, una versión de Soporte a Largo Plazo (LTS), introdujo mejoras significativas como las Clases Selladas (Sealed Classes). Estas permiten que una clase o interfaz restrinja qué otras clases pueden extenderla o implementarla.

Otras características impactantes incluyen las NullPointerExceptions informativas, que proporcionan mensajes detallaos sobre qué variable específica era nula, y la finalización de los Bloques de Texto para un manejo más fácil de strings multilínea.

Esta versión también continuó la tendencia de eliminar APIs obsoletas y fortalecer la encapsulación interna del JDK, empujando a los desarrolladores hacia prácticas de codificación más seguras y sostenibles.

**Puntos Clave**
*   Fortalece el control arquitectónico mediante Clases Selladas y mejora la productividad del desarrollador con mejores herramientas de diagnóstico y una sintaxis de strings más limpia.

**Ejemplo**
```java
// Clase sellada
public sealed class Forma permits Circulo, Cuadrado {}

// Bloque de texto
String json = """
    {
        "name": "Perficient"
    }
    """;
```

---

## 16. Características de Java 21 (Java 21 Features)
**Descripción**
Java 21 es una versión LTS histórica que introdujo los Hilos Virtuales (Proyecto Loom). Estos hilos ligeros revolucionan la escalabilidad permitiendo que las aplicaciones manejen millones de tareas sin esfuerzo.

La entrega también finalizó los Patrones de Record para la coincidencia de patrones e introdujo las Colecciones Secuenciadas, que proporcionan una API unificada para acceder a elementos en colecciones ordenadas como `List` o `LinkedHashSet`.

La Concurrencia Estructurada, aunque en fase previa, busca hacer la programación multi-hilo más mantenible al tratar grupos de tareas relacionadas como una sola unidad, simplificando la propagación de errores.

**Puntos Clave**
*   Revoluciona la concurrencia con Hilos Virtuales y refina la manipulación de datos con Patrones de Record y Colecciones Secuenciadas.

**Ejemplo**
```java
// Colecciones secuenciadas
List<String> list = List.of("A", "B");
String first = list.getFirst();
String last = list.getLast();
```

---

## 17. Java 25 y Futuras Características (Java 25 & Future Features)
**Description**
Mirando hacia Java 25 y más allá, el lenguaje continúa evolucionando con características como las Plantillas de Strings (String Templates - Proyecto Amber) para una interpolación de strings más segura y legible.

El Proyecto Panama está trayendo la API de Memoria y Funciones Foráneas, proporcionando una alternativa más segura y eficiente a JNI para interactuar con librerías que no son de Java (como las escritas en C).

El Proyecto Leyden se enfoca en mejorar el tiempo de arranque y la huella de memoria de las aplicaciones Java, abordando una de las debilidades tradicionales de la plataforma en entornos serverless y de contenedores.

**Puntos Clave**
*   Continúa modernizando la plataforma mejorando el rendimiento de arranque, facilitando la integración externa y mejorando la seguridad de los strings.

**Ejemplo**
```java
// Concepto futuro: String Templates
String name = "Mundo";
String info = str."Hola \{name}"; // (Sujeto a cambios en versión final)
```
