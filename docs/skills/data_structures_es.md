# Descripciones de Habilidades: Estructuras de Datos

Este documento cubre las estructuras de datos fundamentales y avanzadas, el análisis de complejidad (Big O) y los algoritmos comunes utilizados en el desarrollo de software eficiente.

---

## 1. Arrays - Listas - Conjuntos - Mapas (Arrays - Lists - Sets - Maps)
**Descripción**
Estas son las colecciones fundamentales en Java. Los Arrays son estructuras de tamaño fijo, mientras que los ArrayLists ofrecen un redimensionamiento dinámico. Comprender las ventajas y desventajas entre ellos —como el acceso en tiempo constante para los arrays frente a la sobrecarga de redimensionamiento para las listas— es básico para cualquier desarrollador.

Los Conjuntos (Sets) son colecciones especializadas que aseguran la unicidad, evitando elementos duplicados. Los Mapas (como HashMap) almacenan datos en pares clave-valor, utilizando dispersión (hashing) para proporcionar una recuperación casi instantánea (O(1) en promedio). Estas estructuras son las herramientas principales de gestión de datos en la mayoría de las aplicaciones.

El uso avanzado implica saber cuándo usar versiones especializadas como TreeMap (para mapas ordenados) o LinkedList (para inserciones frecuentes en medio de una lista). Elegir la colección correcta puede cambiar drásticamente el uso de memoria y la velocidad de ejecución de un programa.

**Puntos Clave**
*   Organiza los datos en colecciones estructuradas, seleccionando entre modelos lineales, únicos o asociativos para optimizar la velocidad de acceso y la integridad de los datos.

**Ejemplo**
```java
// Mapa para búsqueda instantánea por ID
Map<Integer, String> usuarios = new HashMap<>();
usuarios.put(1, "Ana");
String nombre = usuarios.get(1); // O(1)

// Conjunto para evitar duplicados automáticamente
Set<String> etiquetas = new HashSet<>();
etiquetas.add("Java");
etiquetas.add("Java"); // No se añade, ya existe
```

---

## 2. NP Complete y NP Hard (NP Complete and NP Hard understanding)
**Descripción**
Las clases de complejidad como P, NP, NP-Complete y NP-Hard ayudan a categorizar qué tan difícil es resolver un problema. Los problemas P son aquellos resolubles en "tiempo polinomial" (eficientemente), mientras que los problemas NP son aquellos cuyas soluciones pueden ser *verificadas* rápidamente, incluso si encontrarlas es lento.

Los problemas NP-Complete son los más difíciles dentro de NP; si se encuentra una solución eficiente para uno, se aplica a todos. Los problemas NP-Hard son al menos tan difíciles como los más difíciles de NP, pero pueden incluso no ser verificables en tiempo polinomial, representando los límites de la viabilidad computacional.

Comprender estas clases es vital al diseñar algoritmos para tareas como la optimización (ej. el problema del viajante). Reconocer un problema NP-Complete evita que los desarrolladores pierdan tiempo buscando una solución perfectamente eficiente que probablemente no existe, optando en su lugar por aproximaciones o heurísticas.

**Puntos Clave**
*   Clasifica los problemas computacionales por su dificultad inherente, guiando a los desarrolladores hacia enfoques algorítmicos realistas para tareas de optimización complejas.

**Ejemplo**
El **Problema del Viajante (TSP)**: Encontrar la ruta más corta que visite N ciudades. Con 10 ciudades es fácil, con 100 es computacionalmente imposible hallar la solución perfecta rápido. Se usan algoritmos "Genéticos" o "Búsqueda Tabú" para hallar una solución "suficientemente buena".

---

## 3. Heaps - Sufijos - Tries (Heaps - Sufixes - Tries)
**Descripción**
Las estructuras avanzadas basadas en árboles como Heaps, Árboles de Sufijos y Tries resuelven problemas especializados de manera eficiente. Un Heap es un árbol binario completo utilizado para implementar colas de prioridad, donde la raíz siempre contiene el elemento máximo o mínimo.

Los Tries (Árboles de Prefijos) están optimizados para la recuperación de cadenas, donde cada nodo representa un carácter. Son excepcionalmente rápidos para funciones de autocompletado y búsquedas en diccionarios porque permiten buscar por prefijo en un tiempo proporcional a la longitud de la cadena, no al tamaño del diccionario.

Los Árboles de Sufijos almacenan todos los sufijos de una cadena dada, permitiendo coincidencias de patrones complejas y búsquedas de subcadenas en tiempo lineal. Aunque son más complejos de implementar, estas estructuras son esenciales para el procesamiento de texto de alto rendimiento y aplicaciones de bioinformática.

**Puntos Clave**
*   Utiliza estructuras jerárquicas especializadas para lograr resultados de alto rendimiento en la gestión de prioridades, búsqueda de cadenas y reconocimiento de patrones complejos.

**Ejemplo**
```java
// Heap (Cola de Prioridad) en Java
PriorityQueue<Integer> colaPrioridad = new PriorityQueue<>();
colaPrioridad.add(10);
colaPrioridad.add(5);
int menor = colaPrioridad.poll(); // Devuelve 5 siempre (el de mayor prioridad)

// Trie: Usado en buscadores para sugerir "ca..." -> "casa", "carro", "calle"
```

---

## 4. Notación Big O (O(n) notation)
**Descripción**
La notación Big O es el lenguaje matemático estándar para describir la eficiencia de un algoritmo. Mide cómo crece el tiempo de ejecución o el uso de memoria a medida que aumenta el tamaño de la entrada (n), centrándose en el peor de los escenarios.

Las complejidades comunes incluyen O(1) para tiempo constante, O(n) para crecimiento lineal y O(n log n) para ordenamiento eficiente. Complejidades superiores como O(n^2) (cuadrática) o O(2^n) (exponencial) indican algoritmos que se vuelven inutilizables a medida que crece el volumen de datos.

Dominar Big O permite a los desarrolladores predecir cómo se comportará su código a escala. No se trata solo de la velocidad actual, sino de la escalabilidad; un algoritmo que funciona para 100 elementos podría colapsar el sistema al procesar 1,000,000 si la complejidad es demasiado alta.

**Puntos Clave**
*   Proporciona una métrica estandarizada para evaluar la escalabilidad algorítmica, asegurando que el código siga siendo eficiente a medida que el tamaño de los datos aumenta significativamente.

**Ejemplo**
*   **O(1)**: Acceder a un elemento de un array por su índice `lista[5]`.
*   **O(n)**: Buscar un elemento en una lista desordenada (tienes que mirar uno por uno).
*   **O(log n)**: Búsqueda binaria en una lista ordenada (vas dividiendo por la mitad).

---

## 5. Algoritmos de Ordenamiento (Sort Algorithms)
**Descripción**
El ordenamiento es una operación fundamental en la computación. Los algoritmos comunes incluyen Bubble Sort e Insertion Sort (simples pero lentos para conjuntos grandes), y métodos más eficientes de "Dividir y Vencerás" como Merge Sort y Quick Sort.

Cada algoritmo tiene sus ventajas. Quick Sort suele ser más rápido en la práctica y usa menos memoria (in-situ), pero su peor caso es pobre. Merge Sort garantiza O(n log n) pero requiere memoria extra. La elección depende de las restricciones de memoria y las características de los datos.

La estabilidad es otra propiedad clave; un ordenamiento estable preserva el orden relativo de los elementos con claves iguales. Los lenguajes modernos suelen usar "Timsort" (un híbrido de Merge e Insertion sort) para proporcionar un valor predeterminado estable y de alto rendimiento.

**Puntos Clave**
*   Aplica diversas estrategias técnicas para organizar los datos de manera eficiente, equilibrando la velocidad de ejecución, el uso de memoria y la estabilidad.

**Ejemplo**
```java
// Ordenamiento eficiente en Java (usa Timsort internamente)
Collections.sort(miLista); 

// QuickSort: Elige un "pivote" y mueve menores a la izquierda y mayores a la derecha. 
// Es el que más se usa por su velocidad media.
```

---

## 6. Pilas - Colas - Árboles - Grafos (Stacks - Queues - Trees - Graphs)
**Descripción**
Estas estructuras modelan relaciones y flujos de trabajo complejos. Las Pilas (LIFO - Último en entrar, primero en salir) y las Colas (FIFO - Primero en entrar, primero en salir) gestionan el orden de procesamiento. Los Árboles (como los Árboles Binarios de Búsqueda) permiten búsquedas e inserciones logarítmicas manteniendo una jerarquía ordenada.

Los Grafos son la estructura más general, representando nodos y las conexiones (aristas) entre ellos. Se utilizan para redes sociales, rutas en mapas y gestión de dependencias. Algoritmos como BFS (Búsqueda en anchura) y DFS (Búsqueda en profundidad) se utilizan para recorrer estas redes.

Elegir entre estas estructuras depende de la naturaleza de las relaciones de los datos. Por ejemplo, un árbol es ideal para un sistema de archivos, mientras que un grafo es necesario para una red de vuelos donde existen ciclos y múltiples caminos entre ciudades.

**Puntos Clave**
*   Modela flujos de datos y relaciones complejas del mundo real utilizando estructuras lineales, jerárquicas o de red para permitir una gestión y un recorrido eficientes.

**Ejemplo**
```java
// Pila: El botón "Atrás" del navegador (Stack)
Deque<String> historial = new ArrayDeque<>();
historial.push("google.com");
historial.push("github.com");
String ultima = historial.pop(); // github.com

// Grafo: Las conexiones de amigos en Facebook o LinkedIn.
```
