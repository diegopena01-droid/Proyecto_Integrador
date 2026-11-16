## Proyecto Integrador – Web 1

**Institución:** Unidad Central del Valle del Cauca 
**Programa académico:** Ingeniería de Sistemas  
**Asignatura:** Bases de Datos  
**Docente:** Jesús David Mejía Vergara  

## Descripción del proyecto

CheckEvent es una aplicación web diseñada para facilitar la gestión de eventos y reservas. Su propósito es ofrecer una interfaz intuitiva en la que los usuarios puedan consultar eventos disponibles, realizar reservas y revisar su estado, mientras que los agentes y administradores cuentan con módulos orientados a la gestión y consulta de información.

El proyecto se desarrolla como parte del Proyecto Integrador de la asignatura Programacion Web I y contempla una arquitectura organizada por módulos, con datos de prueba para simular el funcionamiento de la aplicación durante la etapa inicial del desarrollo.

## Objetivo general

Desarrollar una aplicación web para la gestión de eventos y reservas, con interfaces organizadas por roles de usuario, navegación entre módulos y una estructura que facilite su mantenimiento y futura integración con una base de datos.

## Tecnologías utilizadas

- **Angular:** desarrollo de la aplicación web.
- **TypeScript:** programación y organización de la lógica.
- **HTML5:** estructura de las páginas.
- **SCSS:** estilos personalizados.
- **Bootstrap:** diseño de interfaces y componentes responsivos.
- **Bootstrap Icons:** iconografía de la aplicación.
- **Git y GitHub:** control de versiones y trabajo colaborativo.
- **Datos simulados:** información de prueba para representar eventos y reservas durante el desarrollo del frontend.

## Módulos del sistema

### 1. Autenticación
- Inicio de sesión.
- Registro de usuarios.
- Selección del rol del usuario durante el registro.

### 2. Cliente
- Visualización de eventos disponibles.
- Consulta de información de los eventos.
- Creación de reservas.
- Consulta de las reservas realizadas y sus estados.

### 3. Agente
- Módulo para la gestión de eventos.
- Consulta de eventos registrados.
- Gestión y actualización del estado de las reservas.

### 4. Administrador
- Módulo destinado a la consulta de información y generación de reportes.
- Visualización de información mediante tablas y gráficos.

**Nota:** los módulos se encuentran en desarrollo progresivo. La disponibilidad de cada funcionalidad depende de su implementación actual en el proyecto.


## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm instalados.
- Visual Studio Code u otro editor compatible.
- Git para gestionar los cambios del proyecto.


## Diseño de la interfaz

Eventia utiliza una identidad visual basada en tonos morados, tarjetas para presentar los eventos, iconos para facilitar la identificación de la información y componentes de Bootstrap para mantener una interfaz organizada y adaptable a diferentes tamaños de pantalla.

## Estado actual del proyecto

El proyecto se encuentra en desarrollo. Actualmente se trabaja en la estructura de navegación, las páginas de autenticación y los módulos del cliente, con el objetivo de completar progresivamente las funcionalidades correspondientes a cada rol.

La información simulada permite probar la presentación de los datos y el flujo de navegación antes de implementar la integración con una base de datos.

## Control de versiones

El proyecto utiliza Git y GitHub para registrar los avances mediante commits y facilitar el trabajo colaborativo.

## Licencia

Proyecto académico desarrollado con fines educativos para la asignatura Bases de Datos de la UCEVA.
