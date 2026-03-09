# Descripciones de Habilidades: Frameworks de Java

Este documento cubre los conceptos centrales del Spring Framework, incluyendo su contenedor IoC, la gestión de beans y las anotaciones de estereotipo utilizadas en aplicaciones empresariales modernas.

---

## 1. Núcleo del Spring Framework (Spring Framework)
**Descripción**
Spring es el framework estándar de la industria para construir aplicaciones Java empresariales. Su filosofía central se basa en la "Inversión de Control" (IoC), que traslada la responsabilidad de la creación de objetos y la gestión de su ciclo de vida del desarrollador al Contenedor de Spring.

La implementación más común de IoC en Spring es la Inyección de Dependencias (DI). En lugar de que una clase cree sus propias dependencias, Spring las "inyecta" en tiempo de ejecución. Esto conduce a un código altamente desacoplado, mucho más fácil de probar con mocks y muy flexible ante los cambios.

Más allá de la DI, el Contenedor de Spring (ApplicationContext) proporciona características avanzadas como el manejo de eventos, la internacionalización y una gestión robusta de recursos. Sirve como la columna vertebral unificada para un amplio ecosistema de módulos (Security, Data, Boot) que simplifican cada aspecto del desarrollo.

**Puntos Clave**
*   Proporciona una infraestructura integral para aplicaciones Java mediante la Inversión de Control y la Inyección de Dependencias, permitiendo software modular, testeable y mantenible.

**Ejemplo**
```java
// Definición de un componente gestionado por Spring
@Component
public class Motor {
    public void arrancar() { System.out.println("Motor en marcha"); }
}

// Spring inyecta el Motor automáticamente en el Coche
@Component
public class Coche {
    private final Motor motor;

    @Autowired
    public Coche(Motor motor) { this.motor = motor; }
}
```

---

## 2. Anotaciones de Spring (Annotations @Component vs @Service @Repository)
**Descripción**
En Spring, un objeto gestionado por el contenedor se llama "Bean". Comprender el ciclo de vida del bean —desde la instanciación e inyección de dependencias hasta la inicialización y destrucción— es crucial para gestionar recursos como conexiones a bases de datos o sockets de red.

Spring define diferentes "Ámbitos" (Scopes) para estos beans. El valor por defecto es "Singleton", donde una única instancia se comparte en toda la aplicación. "Prototype" crea una nueva instancia cada vez que se solicita el bean, lo cual es útil para objetos con estado que no deben ser compartidos.

Las aplicaciones web añaden más ámbitos, como "Request", "Session" y "Application", que vinculan el ciclo de vida de un bean a contextos HTTP específicos. Elegir correctamente el ámbito es esencial para garantizar la seguridad de hilos (thread safety) y el uso eficiente de la memoria en sistemas de alto tráfico.

**Puntos Clave**
*   Gestiona la creación, visibilidad y destrucción de los componentes de la aplicación a través de ciclos de vida estructurados y ámbitos de visibilidad configurables.

**Ejemplo**
```java
@Component
@Scope("prototype") // Se crea uno nuevo cada vez que se pide
public class ProcesadorDeArchivos {
    // Estado específico por cada archivo procesado
}

@Component
@Scope("singleton") // Una sola instancia para toda la App (por defecto)
public class ConfiguracionGlobal {
    // Datos compartidos
}
```

---

## 3. Anotaciones de Spring (@Component, @Service, @Repository)
**Descripción**
Spring utiliza anotaciones de estereotipo para categorizar y registrar automáticamente los beans. @Component es el estereotipo genérico, mientras que otros especializados como @Service (para lógica de negocio) y @Repository (para acceso a datos) aportan significado semántico y características especializadas.

Por ejemplo, @Repository no solo registra el bean, sino que también habilita la traducción automática de excepciones de base de datos específicas del proveedor a la jerarquía unificada DataAccessException de Spring. Esto permite que la aplicación maneje errores de forma consistente independientemente de la base de datos subyacente.

@RestController es una versión especializada de @Controller que lo combina con @ResponseBody, serializando automáticamente los valores de retorno en JSON o XML. Estas anotaciones, utilizadas junto con @Autowired para la inyección, forman la base del estilo de programación declarativa que hace a Spring tan potente.

**Puntos Clave**
*   Simplifica la configuración y el descubrimiento de aplicaciones a través de estereotipos semánticos que habilitan comportamientos especializados del framework, como la traducción de excepciones y la serialización automática.

**Ejemplo**
```java
@Repository // Indica acceso a datos y traduce excepciones
public interface UsuarioRepository extends JpaRepository<Usuario, Long> { }

@Service // Indica lógica de negocio
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;
}

@RestController // Indica controlador de API REST
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @GetMapping("/{id}")
    public Usuario get(@PathVariable Long id) { ... }
}
```

---

## 4. Estrategias de Inversión de Control (IoC Strategies)
**Descripción**
Aunque la DI es la estrategia de IoC más utilizada, Spring ofrece múltiples formas de realizarla. La inyección por constructor es el enfoque más recomendado, ya que asegura que las dependencias sean obligatorias, que el objeto esté siempre en un estado válido tras su creación y facilita la inmutabilidad.

La inyección por campo (usando @Autowired directamente sobre el atributo) es común pero se desaconseja para código de producción porque dificulta las pruebas unitarias y oculta el número de dependencias que tiene una clase. La inyección por setter es un punto medio, útil para dependencias opcionales que pueden cambiar en tiempo de ejecución.

La IoC avanzada también incluye la "Programación Orientada a Aspectos" (AOP). La AOP permite a los desarrolladores separar preocupaciones transversales —como el registro de logs, la seguridad o las transacciones— en "Aspectos" separados que se entrelazan automáticamente en el flujo de ejecución de la aplicación sin ensuciar la lógica de negocio.

**Puntos Clave**
*   Desacopla la lógica de negocio de la gestión de recursos mediante diversas estrategias de inyección y programación orientada a aspectos, mejorando la claridad del código y la separación de preocupaciones.

**Ejemplo**
```java
// Recomendado: Inyección por constructor (claro y testeable)
@Service
public class PedidoService {
    private final Notificador notificador;

    public PedidoService(Notificador notificador) {
        this.notificador = notificador;
    }
}

// AOP: Ejecuta lógica antes de cualquier método de servicio
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.app.service.*.*(..))")
    public void logBefore() { System.out.println("Servicio iniciado..."); }
}
```
