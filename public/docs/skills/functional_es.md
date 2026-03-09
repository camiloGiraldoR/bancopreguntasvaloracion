# Descripciones de Habilidades: Programación Funcional

Este documento cubre el paradigma de programación funcional en Java, introducido en Java 8, incluyendo expresiones Lambda, la API de Streams y el contenedor Optional.

---

## 1. Expresiones Lambda (Immutability)
**Descripción**
Las expresiones Lambda son la piedra angular de la programación funcional en Java. Proporcionan una forma clara y concisa de representar interfaces de un solo método (Interfaces Funcionales) utilizando una sintaxis simple: (parámetros) -> expresión. Esto reduce significativamente el código redundante (boilerplate).

Internamente, las Lambdas no son solo clases anónimas; se implementan utilizando la instrucción `invokedynamic`, lo que las hace más eficientes en memoria. Capturan variables de su ámbito circundante, siempre que estas sean "efectivamente finales", lo que garantiza la seguridad de hilos y la predictibilidad.

Dominar las Lambdas permite a los desarrolladores pasar comportamiento como si fuera datos. Esto es fundamental para las APIs modernas de Java, permitiendo un estilo más declarativo donde se especifica *qué* debe hacerse en lugar de *cómo* recorrer elementos y gestionar el estado manualmente.

**Puntos Clave**
*   Permite la representación concisa de funciones anónimas, dejando que el comportamiento se pase como parámetro mientras mejora la legibilidad del código y la eficiencia de memoria.

**Ejemplo**
```java
// Antes (Clase anónima pesada)
Collections.sort(nombres, new Comparator<String>() {
    public int compare(String a, String b) { return a.compareTo(b); }
});

// Después (Lambda concisa)
nombres.sort((a, b) -> a.compareTo(b));
```

---

## 2. API de Streams (Monads)
**Descripción**
La API de Streams proporciona una forma potente y declarativa de procesar colecciones de datos. Un Stream no es una estructura de datos en sí misma, sino un conducto (pipeline) de operaciones (como filter, map y reduce) que pueden ejecutarse de forma secuencial o paralela sin modificar la fuente original.

Los Streams utilizan la "Evaluación Perezosa" (Lazy Evaluation), lo que significa que las operaciones intermedias no se ejecutan hasta que se llama a una operación terminal (como collect, findFirst o forEach). Esto permite que la JVM optimice el conducto de procesamiento, por ejemplo, deteniéndose tan pronto como encuentre el primer elemento que coincida.

Los Streams paralelos aprovechan el framework Fork/Join para dividir tareas entre múltiples núcleos de CPU automáticamente. Aunque son potentes, deben usarse con cuidado; para conjuntos de datos pequeños o tareas con alta sobrecarga de sincronización, los streams paralelos pueden ser realmente más lentos que los secuenciales.

**Puntos Clave**
*   Transforma el procesamiento de datos en conductos declarativos optimizados que soportan la evaluación perezosa y la paralelización automática para una gestión de colecciones de alta eficiencia.

**Ejemplo**
```java
List<String> filtrados = nombres.stream()
    .filter(n -> n.startsWith("A")) // Operación intermedia (Lazy)
    .map(String::toUpperCase)      // Operación intermedia (Lazy)
    .collect(Collectors.toList()); // Operación terminal (Ejectua el pipeline)
```

---

## 3. Optional (BFS DFS Recursion)
**Descripción**
Optional es un objeto contenedor utilizado para representar la presencia o ausencia de un valor. Fue introducido para abordar el "error de los mil millones de dólares" de las NullPointerExceptions, obligando a los desarrolladores a manejar explícitamente el caso en el que un valor podría faltar.

En lugar de devolver null, un método devuelve un Optional<T>. Esto aclara la intención del API y proporciona un conjunto rico de métodos como `ifPresent`, `orElse` y `flatMap` para manejar el valor de forma segura sin comprobaciones de nulos explícitas o sentencias if anidadas.

Sin embargo, Optional debe usarse primordialmente como tipo de retorno. Usarlo como un campo en una clase o un parámetro en un constructor a menudo se considera un anti-patrón porque añade una sobrecarga de objetos y complejidad innecesaria sin proporcionar beneficios significativos en esos contextos.

**Puntos Clave**
*   Mitiga los errores relacionados con nulos al proporcionar un contenedor seguro para tipos de valores opcionales, fomentando el manejo explícito de datos faltantes a través de una API clara y expresiva.

**Ejemplo**
```java
// Buscar un usuario que podría no existir
Optional<Usuario> usuario = repository.findById(1L);

// Manejo seguro sin "if (usuario != null)"
String nombre = usuario
    .map(Usuario::getNombre)
    .orElse("Invitado");
```

---

## 4. Composición de Funciones (Function Composition)
**Descripción**
La composición de funciones es el proceso de combinar dos o más funciones para producir una nueva función. En Java, esto se puede lograr usando los métodos `andThen()` y `compose()` disponibles en las interfaces funcionales `Function<T, R>`.

Este paradigma favorece la creación de pequeñas funciones con una responsabilidad específica que luego se ensamblan para construir lógicas más complejas. Es un pilar del diseño funcional que promueve la reutilización y la testabilidad, ya que cada función pequeña puede verificarse de forma aislada.

La composición reduce la necesidad de variables intermedias y estado mutable, haciendo el código más declarativo y fácil de razonar. Es especialmente potente en los Pipelines de Streams de Java, donde cada operación (`map`, `filter`) es en esencia una composición funcional.

**Puntos Clave**
*   Ensambla lógica compleja a partir de funciones pequeñas y reutilizables, promoviendo la claridad del código y facilitando las pruebas unitarias de cada pieza de la cadena.

**Ejemplo**
```java
Function<String, String> trim = String::trim;
Function<String, String> upper = String::toUpperCase;

// Composición: primero trim, luego upper
Function<String, String> limpiarYMayusculas = trim.andThen(upper);
System.out.println(limpiarYMayusculas.apply("  hola mundo  ")); // "HOLA MUNDO"
```

---

## 5. Tipos de Datos Algebraicos (Algebraic Data Types - Sealed Futures)
**Descripción**
Los Tipos de Datos Algebraicos (ADTs) son un concepto de la programación funcional que modela datos como una combinación de otros tipos. Los dos principales son los Tipos Suma (la unión - "puede ser A o B") y los Tipos Producto (la combinación - "tiene A y B").

En Java moderno, las `Sealed Classes` (Clases Selladas), introducidas en Java 17, son la implementación nativa de los ADTs de Tipo Suma. Permiten definir exactamente qué subclases pueden existir, habilitando comprobaciones exhaustivas en expresiones `switch` que el compilador puede verificar.

Los ADTs mejoran la seguridad del código al hacer que los estados inválidos sean inexpresables. En lugar de usar `null` o booleanos para representar estados, se modelan como tipos concretos dentro de una jerarquía sellada, lo que obliga a que el código manejador cubra todos los casos posibles.

**Puntos Clave**
*   Modela los datos y estados del dominio de forma precisa y exhaustiva, eliminando los estados inválidos gracias a las garantías de completitud del compilador.

**Ejemplo**
```java
public sealed interface Resultado<T> permits Exito, Fallo {}
public record Exito<T>(T valor) implements Resultado<T> {}
public record Fallo<T>(String error) implements Resultado<T> {}

// El switch es exhaustivo, el compilador avisa si falta un caso
switch (resultado) {
    case Exito<String> e -> System.out.println("Valor: " + e.valor());
    case Fallo<String> f -> System.out.println("Error: " + f.error());
}
```

---

## 6. Efectos Secundarios (Side Effects)
**Descripción**
Un Efecto Secundario (Side Effect) ocurre cuando una función modifica algún estado fuera de su propio alcance, como cambiar una variable global, escribir en una base de datos o imprimir en la consola. Las funciones sin efectos secundarios se llaman "Funciones Puras".

Las funciones puras son la base de la programación funcional: dado el mismo input, siempre producen el mismo output sin modificar nada externo. Esto las hace extremadamente fáciles de probar (no necesitan mocks ni estado previo), predecibles y seguras para la ejecución paralela.

El enfoque funcional no busca eliminar los efectos secundarios (son inevitables para una app útil), sino **contenerlos** en los bordes del sistema. La lógica de negocio central permanece pura, mientras que los efectos (base de datos, red) se aíslan en capas de infraestructura claramente identificadas.

**Puntos Clave**
*   Aísla las operaciones que modifican el estado externo al perímetro del sistema, manteniendo la lógica de negocio central como funciones puras, testeables y predecibles.

**Ejemplo**
```java
// CON efecto secundario (impuro): difícil de testear en paralelo
private int contador = 0;
public int incrementar() { return ++this.contador; } // Modifica estado externo

// SIN efecto secundario (puro): fácil de testear, siempre predecible
public int sumar(int a, int b) { return a + b; }
```

---

## 7. Funciones de Orden Superior (High Order Functions)
**Descripción**
Una Función de Orden Superior (HOF) es una función que puede recibir otras funciones como argumentos o devolver una función como resultado. Este es el mecanismo central que permite el estilo de programación funcional en Java, facilitado por las Interfaces Funcionales y las Lambdas.

Las HOFs permiten un nivel de abstracción mayor al separar el "qué hacer" (la lógica específica) del "cómo iterar" (el mecanismo). Métodos como `stream().filter(predicate)` y `stream().map(function)` son ejemplos de HOFs integradas en el JDK que evitan la escritura de bucles `for` explícitos.

En el diseño de APIs, las HOFs permiten crear frameworks altamente extensibles. En lugar de exponer implementaciones concretas, una API puede aceptar un `Consumer` o `Function` como parámetro, dejando al llamante definir el comportamiento específico sin necesidad de herencia ni interfaces adicionales.

**Puntos Clave**
*   Eleva el nivel de abstracción al tratar las funciones como ciudadanos de primera clase, permitiendo un código más genérico, flexible y expresivo.

**Ejemplo**
```java
// Función de orden superior: recibe una función como parámetro
public static <T> List<T> filtrarLista(List<T> lista, Predicate<T> criterio) {
    return lista.stream().filter(criterio).collect(Collectors.toList());
}

// Uso: la lógica de filtrado se pasa como lambda
List<Integer> pares = filtrarLista(numeros, n -> n % 2 == 0);
```

---

## 8. Varianza - Covarianza - Contravarianza (Variance - Covariance - Contravariance)
**Descripción**
La varianza describe cómo se relaciona la herencia de tipos genéricos con la herencia de sus tipos paramétricos. En Java, los Genéricos son invariantes por defecto: `List<Perro>` NO es un subtipo de `List<Animal>`, incluso si `Perro extends Animal`.

La Covarianza (`? extends T`) permite aceptar tipos que son subtipos de T. Se usa para "producir" datos de manera segura; puedes leer de una `List<? extends Animal>` (obtienes `Animal`), pero no puedes escribir en ella de forma segura. Esta es la "C" del principio PECS (Producer Extends).

La Contravarianza (`? super T`) permite aceptar tipos que son supertipos de T. Se usa para "consumir" datos; puedes escribir en una `List<? super Perro>`, pero solo puedes leer `Object` de ella. Esta es la "S" del principio PECS (Consumer Super). Dominar PECS es esencial para diseñar APIs genéricas flexibles y reutilizables.

**Puntos Clave**
*   Permite diseñar APIs genéricas flexibles y reutilizables al comprender cómo los tipos paramétricos se relacionan con la jerarquía de herencia mediante el uso correcto de comodines acotados.

**Ejemplo**
```java
// Covarianza (Producer Extends): solo leer, seguro
public static double suma(List<? extends Number> numeros) {
    return numeros.stream().mapToDouble(Number::doubleValue).sum();
}

// Contravarianza (Consumer Super): solo escribir, seguro
public static void rellenar(List<? super Integer> lista) {
    lista.add(42);
}
```
