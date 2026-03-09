# Descripciones de Habilidades: Programación Orientada a Objetos (OOP)

Este documento proporciona una visión detallada de los pilares fundamentales de la Programación Orientada a Objetos (OOP), tal como se definen en el modelo de evaluación de Perficient.

---

## 1. Encapsulamiento (Encapsulation)
**Descripción**
El encapsulamiento es el mecanismo de agrupar datos (campos) y los métodos que operan sobre esos datos en una sola unidad llamada clase. Consiste en ocultar el estado interno de un objeto del mundo exterior y exigir que todas las interacciones ocurran a través de una interfaz pública bien definida, típicamente usando getters y setters.

Al restringir el acceso directo a los componentes de un objeto, se evita la interferencia accidental y el mal uso de los datos. Esto permite a los desarrolladores cambiar la implementación interna de una clase (por ejemplo, cambiar una estructura de datos) sin afectar al código que usa la clase, siempre que el API público se mantenga consistente.

A un nivel más avanzado, el encapsulamiento soporta el principio "Tell, Don't Ask" (Dile, no le preguntes), donde instruyes a un objeto para realizar una acción usando sus propios datos en lugar de pedir los datos para tomar una decisión fuera de él. Esto reduce el acoplamiento y mantiene la lógica donde residen los datos.

**Puntos Clave**
*   Protege la integridad del estado interno de un objeto al forzar la interacción a través de métodos públicos, facilitando el mantenimiento y reduciendo el acoplamiento del sistema.

**Ejemplo**
```java
public class CuentaBancaria {
    private double saldo; // Estado oculto

    public void depositar(double cantidad) {
        if (cantidad > 0) {
            this.saldo += cantidad;
        }
    }

    public double getSaldo() { // Interfaz controlada
        return this.saldo;
    }
}
```

---

## 2. Abstracción (Abstraction)
**Descripción**
La abstracción es el proceso de ocultar los detalles complejos de implementación y mostrar solo las características esenciales de un objeto. En Java, esto se logra principalmente a través de Clases Abstractas e Interfaces, que permiten a los desarrolladores definir "qué" hace un objeto sin especificar necesariamente "cómo" lo hace.

Una clase abstracta sirve como una plantilla parcial que puede contener estado y lógica común, mientras que una interfaz define un contrato puro de comportamiento. Elegir entre ellas depende de si se está definiendo una identidad compartida (es-un) o una capacidad compartida (puede-hacer).

Una abstracción efectiva conduce al principio de "programar hacia una interfaz, no hacia una implementación". Esto permite que las partes de un sistema permanezcan independientes, facilitando el intercambio de implementaciones concretas (como diferentes drivers de base de datos) sin romper la aplicación general.

**Puntos Clave**
*   Reduce la carga cognitiva y la complejidad del sistema al enfocarse en comportamientos de alto nivel en lugar de detalles de implementación de bajo nivel.

**Ejemplo**
```java
// Contrato de comportamiento
public interface Notificador {
    void enviar(String mensaje);
}

// Implementación oculta para el cliente
public class NotificadorEmail implements Notificador {
    @Override
    public void enviar(String mensaje) {
        // Lógica compleja de SMTP oculta
        System.out.println("Enviando email: " + mensaje);
    }
}
```

---

## 3. Herencia (Inheritance)
**Descripción**
La herencia permite que una nueva clase (subclase) adquiera las propiedades y comportamientos de una clase existente (superclase). En Java, esto se implementa usando la palabra clave `extends`, lo que promueve la reutilización de código y establece una relación jerárquica entre tipos.

Aunque es potente, la herencia debe usarse con cuidado para evitar jerarquías profundas que hagan el código frágil y difícil de seguir. El Principio de Sustitución de Liskov (LSP) dicta que una subclase debe ser capaz de reemplazar a su superclase sin alterar la corrección del programa.

El diseño moderno a menudo favorece la "Composición sobre la Herencia" (tiene-un vs. es-un). La composición ofrece más flexibilidad, ya que permite cambiar comportamientos en tiempo de ejecución intercambiando componentes, mientras que la herencia crea una relación rígida definida en tiempo de compilación.

**Puntos Clave**
*   Facilita la reutilización de código y la organización jerárquica, pero debe regirse por principios de sustitución y equilibrarse con la composición para una mejor flexibilidad.

**Ejemplo**
```java
public class Empleado {
    protected String nombre;
    public double calcularSalario() { return 1000; }
}

public class Desarrollador extends Empleado {
    @Override
    public double calcularSalario() { 
        return super.calcularSalario() + 500; // Reutilización y extensión
    }
}
```

---

## 4. Polimorfismo (Polymorphism)
**Descripción**
El polimorfismo, que significa "muchas formas", permite que objetos de diferentes clases sean tratados como objetos de una superclase o interfaz común. Esto permite que una sola llamada a un método se comporte de manera diferente según el tipo real del objeto sobre el cual se invoca en tiempo de ejecución.

Java soporta tanto el polimorfismo en tiempo de compilación (Sobrecarga de Métodos) como el polimorfismo en tiempo de ejecución (Sobrescritura de Métodos). La sobrescritura es facilitada por el "Despacho Dinámico de Métodos", donde la JVM decide qué implementación ejecutar basada en el tipo real del objeto.

Este pilar es central para muchos patrones arquitectónicos, como el Patrón Estrategia (Strategy Pattern), donde diferentes algoritmos pueden intercambiarse sin problemas. Permite la creación de sistemas extensibles donde se pueden agregar nuevos tipos con cambios mínimos en el código existente.

**Puntos Clave**
*   Permite diseños extensibles y flexibles al dejar que diferentes implementaciones se usen indistintamente a través de una interfaz o superclase común.

**Ejemplo**
```java
List<Animal> animales = List.of(new Perro(), new Gato());

for (Animal a : animales) {
    a.hacerSonido(); // Ejecuta "Guau" o "Miau" según el objeto real
}
```
