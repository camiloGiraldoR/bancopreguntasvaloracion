# Descripciones de Habilidades: Pruebas para Desarrolladores (Testing)

Este documento cubre las diversas metodologías, herramientas y frameworks de pruebas utilizados en el desarrollo de software moderno para garantizar la calidad del código, la fiabilidad y la seguridad contra regresiones.

---

## 1. TDD (TDD)
**Descripción**
TDD es una metodología de desarrollo donde se escribe una prueba fallida antes de escribir cualquier código funcional. El proceso sigue un ciclo estricto: Rojo (escribir una prueba que falle), Verde (escribir el código mínimo para que pase) y Refactorizar (limpiar el código manteniendo la prueba en verde).

Este enfoque cambia el enfoque de "escribir código" a "cumplir requisitos". Conduce a diseños altamente modulares y desacoplados porque el código *debe* ser ejecutable por definición. TDD también resulta en una cobertura de pruebas casi perfecta, proporcionando una red de seguridad integral para cambios futuros.

Más allá de las pruebas unitarias, TDD ayuda a los desarrolladores a detectar casos de borde temprano. Sin embargo, requiere disciplina; la tentación de "simplemente escribir el código primero" es fuerte, pero seguir el ciclo asegura que las pruebas sean significativas y que el sistema siga siendo fácil de mantener.

**Puntos Clave**
*   Impulsa el diseño de software a través de un ciclo riguroso de "prueba primero", asegurando una alta calidad de código, cobertura integral y una base confiable para la refactorización continua.

**Ejemplo**
```java
// Paso 1 (Rojo): Escribir la prueba antes de que exista la lógica
@Test
void debeSumarDosNumeros() {
    Calculadora calc = new Calculadora();
    assertEquals(5, calc.sumar(2, 3)); // Fallará porque 'sumar' no existe o no hace nada
}

// Paso 2 (Verde): Escribir el código mínimo
public int sumar(int a, int b) { return a + b; }
```

---

## 2. Pruebas de Contrato (Contract testing)
**Descripción**
Las pruebas de contrato son una técnica para verificar que dos servicios independientes (como un Microservicio y su consumidor) se comunican con éxito. En lugar de probar todo el sistema junto, cada lado prueba contra un "Contrato" acordado mutuamente.

Los Contratos Dirigidos por el Consumidor (CDC) son el enfoque más popular, donde el consumidor define exactamente qué datos necesita. Herramientas como Pact generan estos contratos y verifican que el proveedor (la API) siga cumpliendo esos requisitos cada vez que cambia su código.

Esto es mucho más rápido y estable que las pruebas tradicionales de extremo a extremo (E2E). Permite que los equipos desplieguen sus servicios de forma independiente con la total confianza de que no romperán a sus vecinos, lo cual es esencial para escalar arquitecturas de microservicios.

**Puntos Clave**
*   Garantiza la compatibilidad de integración entre servicios a través de acuerdos compartidos y automatizados, permitiendo despliegues más rápidos y autonomía de los equipos en sistemas distribuidos.

**Ejemplo**
El equipo de Frontend define un contrato (archivo JSON) donde dice que necesita que `/api/usuario` devuelva `id` y `nombre`. El equipo de Backend corre una prueba que valida que su API siempre cumpla con ese esquema exacto.

---

## 3. Mocking e Isolation (Mocking)
**Descripción**
El "Mocking" consiste en crear objetos "falsos" que simulan el comportamiento de dependencias reales (como bases de datos o APIs externas) durante una prueba. Esto permite el aislamiento total de la "Unidad" que se está probando, asegurando que los fallos se deban solo al código bajo prueba.

En el mundo Java, Mockito es la librería estándar para esto. Permite a los desarrolladores definir qué debe devolver un método ("stubbing") y verificar que un método fue realmente llamado con los parámetros esperados ("verification").

Aunque es potente, el "Exceso de Mocking" es un riesgo. Si una prueba simula casi todo, podría pasar correctamente incluso si los componentes reales no funcionan juntos en absoluto. Una estrategia saludable equilibra pruebas unitarias aisladas con pruebas de integración que usen recursos reales (o contenedorizados).

**Puntos Clave**
*   Facilita la validación granular del código mediante la simulación de dependencias externas, permitiendo pruebas unitarias rápidas, aisladas y altamente predecibles.

**Ejemplo**
```java
// Simular un repositorio para no tocar la base de datos real
UsuarioRepository mockRepo = mock(UsuarioRepository.class);
when(mockRepo.findById(1L)).thenReturn(new Usuario("Ana"));

UsuarioService service = new UsuarioService(mockRepo);
assertEquals("Ana", service.obtenerNombre(1L));
```

---

## 4. Frameworks de Automatización (Automation Frameworks)
**Descripción**
Los frameworks de automatización controlan el navegador para probar la aplicación desde la perspectiva del usuario. Selenium es la herramienta veterana, mientras que alternativas modernas como Playwright y Cypress ofrecen más velocidad y estabilidad al ejecutarse más cerca del motor del navegador.

El "Page Object Model" (POM) es el estándar para organizar estas pruebas. Consiste en crear clases que representan páginas específicas, separando el "qué probar" del "cómo encontrar elementos". Esto hace que la suite de pruebas sea mucho más fácil de mantener cuando el diseño de la interfaz cambia.

Una automatización robusta evita los "Sleeps" fijos en favor de "Esperas Explícitas", donde la prueba espera a que un elemento sea visible o se cumpla una condición. Esto evita pruebas "flaky" (inestables) que fallan aleatoriamente por latencia de red.

**Puntos Clave**
*   Valida la funcionalidad de cara al usuario mediante la automatización del navegador, utilizando patrones de diseño modernos para construir suites de pruebas de UI estables y mantenibles.

**Ejemplo**
```javascript
// Usando Cypress para probar un login
cy.visit('/login');
cy.get('#usuario').type('admin');
cy.get('#clave').type('1234');
cy.get('#btn-entrar').click();
cy.url().should('include', '/dashboard'); // Verificación
```

---

## 5. Pruebas de Componentes (Component Testing)
**Descripción**
Las pruebas de componentes se sitúan entre las pruebas unitarias y las E2E. Verifican una pieza individual de la interfaz (como un botón, formulario o tarjeta) de forma aislada. A diferencia de una prueba unitaria de lógica, renderiza el componente en un "DOM" e interactúa con él como lo haría un usuario.

En React, "React Testing Library" (RTL) es la herramienta preferida. Su lema es "prueba lo que el usuario ve", por lo que fomenta encontrar elementos por texto o roles ARIA en lugar de clases CSS, que son detalles de implementación que cambian frecuentemente.

Las pruebas de componentes son excelentes para probar estados complejos de la UI —como iconos de carga, mensajes de error o validación de formularios— sin la sobrecarga de iniciar todo el backend. Proporcionan retroalimentación rápida sobre la corrección visual e interactiva del frontend.

**Puntos Clave**
*   Asegura la fiabilidad de los componentes de la interfaz de usuario probando el renderizado visual y las interacciones del usuario de forma aislada, centrándose en el comportamiento.

**Ejemplo**
```javascript
// Probar que un botón cambia de texto al hacer clic
render(<BotonAlternador />);
const boton = screen.getByRole('button');
fireEvent.click(boton);
expect(boton).toHaveTextContent('Activado');
```

---

## 6. BDD - Creación de Casos de Prueba (Test Case Creation BDD)
**Descripción**
BDD es un proceso colaborativo que utiliza lenguaje natural para cerrar la brecha entre los requisitos de negocio y las pruebas técnicas. Los requisitos se escriben como "Historias de Usuario" con "Escenarios" específicos que describen el comportamiento esperado.

Estos escenarios utilizan la sintaxis Gherkin: Given (Dado que - Contexto), When (Cuando - Acción), Then (Entonces - Resultado). Estas "Features" no son solo documentación; son pruebas ejecutables que verifican que el sistema se comporta exactamente como los interesados esperan.

Herramientas como Cucumber o JBehave conectan estos pasos de Gherkin con código real (Step Definitions). Esto crea una "Documentación Viva" para el proyecto que siempre está actualizada, fomentando una mejor comunicación entre desarrolladores, testers y dueños de producto.

**Puntos Clave**
*   Alinea la implementación técnica con los objetivos de negocio a través de escenarios descriptivos y ejecutables en lenguaje natural, facilitando una comprensión compartida.

**Ejemplo**
```gherkin
Escenario: Login exitoso
  Dado que el usuario está en la página de login
  Cuando ingresa credenciales válidas
  Entonces debe ser redirigido al inicio
```

---

## 7. Pruebas E2E (E2E testing)
**Descripción**
Las pruebas E2E validan todo el flujo de trabajo de la aplicación, desde la interfaz de usuario hasta la base de datos e integraciones externas. Es la comprobación definitiva de que el sistema en su conjunto cumple los objetivos del usuario en un entorno realista.

Debido a que cubren mucho terreno, las pruebas E2E son más lentas y propensas a fallos aleatorios ("flakiness"). Para minimizar esto, los desarrolladores deben asegurar un entorno de prueba limpio y usar selectores estables que no dependan de estilos CSS frágiles.

Una estrategia E2E completa también incluye pruebas de "Regresión Visual", que comparan capturas de pantalla de la aplicación contra una versión "maestra" para detectar cambios visuales no deseados (como un botón moviéndose 5 píxeles o un color cambiando) de forma automática.

**Puntos Clave**
*   Garantiza que todo el sistema funcione correctamente desde la perspectiva del usuario, proporcionando el paso final de validación para flujos de trabajo complejos.

**Ejemplo**
Una prueba que abre Chrome, entra a la tienda, añade un producto al carrito, realiza el pago con una tarjeta de prueba y verifica que el pedido aparezca en la base de datos con estado "Pagado".

---

## 8. Herramientas de Testing para React (React Js | Unit Testing Tools)
**Descripción**
El ecosistema de pruebas de React se centra en **Jest** como el framework de pruebas estándar de facto y **React Testing Library (RTL)** como la librería de renderizado de componentes. Jest gestiona la ejecución de pruebas, las aserciones y el mocking, mientras que RTL proporciona utilidades para renderizar componentes e interactuar con el DOM resultante.

La filosofía de RTL es "cuanto más se parezcan tus pruebas a cómo se usa tu software, más confianza te darán". Por eso, fomenta buscar elementos por roles ARIA, texto visible o etiquetas, en lugar de por selectores CSS o nombres de clases que son detalles de implementación frágiles.

Las herramientas avanzadas incluyen **Vitest** (más rápido que Jest, compatible con proyectos Vite) y **MSW (Mock Service Worker)** para simular las llamadas a la API a nivel de red. Esto permite probar componentes que hacen fetch de datos de forma realista sin modificar el código fuente para las pruebas.

**Puntos Clave**
*   Valida el comportamiento de los componentes React desde la perspectiva del usuario, utilizando Jest para la infraestructura de pruebas y RTL para interacciones que imitan el uso real.

**Ejemplo**
```javascript
// React Testing Library: prueba orientada al comportamiento del usuario
import { render, screen, fireEvent } from '@testing-library/react';
import BotonContador from './BotonContador';

test('incrementa el contador al hacer clic', () => {
  render(<BotonContador />);
  const boton = screen.getByRole('button', { name: /incrementar/i });
  fireEvent.click(boton);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

---

## 9. Pruebas de Integración (Integration Testing (Test Container, On Memory DB))
**Descripción**
Las pruebas de integración verifican que diferentes partes del sistema funcionen juntas correctamente, como un Repositorio hablando con una base de datos real. A diferencia de las pruebas unitarias, estas pruebas involucran entrada/salida (IO) y red reales.

Usar una base de datos "En Memoria" como H2 es una forma común de acelerar estas pruebas. Sin embargo, H2 no siempre se comporta exactamente como las bases de datos de producción (PostgreSQL u Oracle). Aquí es donde brilla "TestContainers", ya que permite ejecutar el mismo motor de base de datos dentro de un contenedor Docker.

Las pruebas de integración también usan herramientas como "WireMock" para simular APIs REST externas. Esto permite probar cómo la aplicación maneja respuestas lentas, errores 500 o datos inesperados de servicios de terceros sin llamarlos realmente durante la construcción.

**Puntos Clave**
*   Valida la interacción entre componentes internos y externos del sistema utilizando entornos realistas (contenedores y simuladores) para asegurar la preparación para producción.

**Ejemplo**
Usar **TestContainers** para levantar un Docker de **PostgreSQL** temporal, correr las migraciones de base de datos, insertar datos de prueba y validar que tus consultas SQL devuelvan los resultados correctos en un entorno igual al de producción.
