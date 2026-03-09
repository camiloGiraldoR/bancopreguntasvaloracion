# Descripciones de Habilidades: JVM (Java Virtual Machine)

Este documento cubre el funcionamiento interno de la JVM, incluyendo su arquitectura, gestión de memoria (Heap y Stack) y el proceso automático de recolección de basura (Garbage Collection).

---

## 1. Arquitectura de la JVM (Java Virtual Machine)
**Descripción**
La Máquina Virtual de Java (JVM) es el motor que impulsa la promesa de Java de "Escribir una vez, ejecutar en cualquier lugar". Actúa como una capa de abstracción entre el código de bytes (bytecode) de Java compilado y el hardware y sistema operativo subyacentes, asegurando un comportamiento consistente en diferentes plataformas.

El proceso de ejecución involucra componentes como el ClassLoader (para cargar archivos), el Runtime Data Areas (memoria) y el Motor de Ejecución (Execution Engine). El Motor de Ejecución utiliza un compilador Just-In-Time (JIT) para convertir el bytecode de uso frecuente en código de máquina nativo, mejorando significativamente el rendimiento durante la ejecución.

Comprender la diferencia entre la JVM, el JRE (Entorno de Ejecución) y el JDK (Kit de Desarrollo) es fundamental. Mientras que el JDK proporciona las herramientas para construir aplicaciones, la JVM es el entorno especializado que realmente las ejecuta, gestionando todo, desde la seguridad hasta el aislamiento de la memoria.

**Puntos Clave**
*   Proporciona un entorno de ejecución estandarizado e independiente de la plataforma que optimiza el rendimiento mediante la compilación dinámica y una robusta abstracción de recursos.

**Ejemplo**
Cuando ejecutas `java -jar mi-app.jar`, estás iniciando una instancia de la **JVM**. Esta cargará tus clases bajo demanda (`ClassLoader`), las mantendrá en memoria y usará el compilador **JIT** para que las partes críticas de tu código corran casi tan rápido como si fueran C++.

---

## 2. Gestión de Memoria: Heap vs Stack
**Descripción**
La memoria de la JVM se divide principalmente en dos áreas: el Heap (Montículo) y el Stack (Pila). El Heap es un área compartida donde residen todos los objetos y sus variables de instancia. Es el objetivo principal del Recolector de Basura y su tamaño puede ajustarse mediante argumentos de la JVM (como -Xmx y -Xms).

El Stack, por otro lado, es privado para cada hilo (thread). Almacena variables locales y la "pila de llamadas" de los métodos que se están ejecutando. La memoria del Stack es mucho más rápida que la del Heap y sigue una estructura estricta LIFO (Last-In, First-Out), liberando espacio automáticamente cuando un método termina.

Distinguir entre estos dos es vital para diagnosticar problemas de rendimiento. Mientras que un `StackOverflowError` suele apuntar a una recursividad infinita o muy profunda, un `OutOfMemoryError` en el Heap indica que se están creando demasiados objetos o que una fuga de memoria (memory leak) impide su recolección.

**Puntos Clave**
*   Optimiza el almacenamiento de datos al separar los datos de objetos compartidos en el Heap y el contexto de ejecución específico de cada hilo en el Stack, permitiendo escalabilidad y ejecución rápida de métodos.

**Ejemplo**
```java
public void miMetodo() {
    int x = 10; // Vive en el STACK (es local y temporal)
    Usuario u = new Usuario(); // La referencia 'u' está en el STACK, 
                               // pero el objeto 'new Usuario()' vive en el HEAP.
}
```

---

## 3. Recolección de Basura (Garbage Collection - GC)
**Descripción**
La Recolección de Basura es el proceso automático de la JVM para identificar y eliminar objetos que ya no son accesibles por la aplicación. Esto elimina la necesidad de una gestión manual de la memoria, reduciendo el riesgo de fugas de memoria y errores de "punteros colgantes" comunes en lenguajes como C++.

El GC funciona rastreando referencias. Cuando un objeto en el Heap ya no está referenciado por ningún hilo activo ni variable estática, se vuelve elegible para ser recolectado. Los recolectores modernos como G1, ZGC o Shenandoah están diseñados para realizar este trabajo con pausas mínimas de tipo "Stop-The-World".

A pesar de ser automático, los desarrolladores todavía necesitan entender el comportamiento del GC para construir aplicaciones de alto rendimiento. Por ejemplo, mantener grandes colecciones de objetos en variables estáticas puede crear una "fuga" porque el GC no puede recolectarlas, lo que lleva a una degradación gradual del rendimiento y choques eventuales.

**Puntos Clave**
*   Automatiza la limpieza de memoria mediante un rastreo inteligente de referencias y algoritmos de recolección especializados, asegurando la estabilidad del sistema mientras se minimizan las interrupciones en la ejecución.

**Ejemplo**
Si tienes un bucle que crea millones de objetos temporales, el **Garbage Collector** entrará en acción periódicamente para liberar esa memoria del **Heap**. Puedes monitorear esto usando herramientas como **VisualVM** o activando logs con `-Xlog:gc`.
