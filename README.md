## Proyecto Integrador – Programación en Ambiente Web I

*Institución:* Unidad Central del Valle del Cauca (UCEVA)  
*Programa académico:* Ingeniería de Sistemas  
*Asignatura:* Programación en Ambiente Web I  
*Docente:* Jesús David Mejía Vergara  

---

## Descripción del proyecto

*CheckEvent* es una aplicación web full-stack para la gestión de eventos y reservas. Permite a los usuarios consultar eventos, realizar reservas y hacer seguimiento de su estado, mientras que agentes y administradores gestionan la información del sistema.

La solución está separada en:

- *Frontend:* Angular (interfaces por rol y consumo de la API).
- *Backend:* API REST con Node.js, Express y TypeScript.
- *Base de datos:* PostgreSQL, levantada con Docker.

---

## Objetivo general

Desarrollar una aplicación web para la gestión de eventos y reservas, con autenticación por roles, módulos diferenciados (cliente, agente y administrador) e integración real con base de datos a través de una API REST.

---

## Tecnologías utilizadas

### Frontend
- Angular
- TypeScript
- HTML5 / SCSS
- Bootstrap y Bootstrap Icons

### Backend
- Node.js y Express
- TypeScript
- PostgreSQL
- Docker y Docker Compose
- JWT (autenticación y control de acceso por rol)

### Herramientas
- Git y GitHub
- Postman (pruebas de la API)
- pgAdmin (opcional, administración de la BD)

---

## Módulos del sistema

### 1. Autenticación
- Inicio de sesión y registro.
- Asignación de rol (cliente, agente, admin).
- Protección de operaciones según el rol del usuario.

### 2. Cliente
- Listado de eventos disponibles (datos desde la API).
- Consulta de detalle (lugar, ciudad, fecha, precio, estado).
- Creación de reservas asociadas a un evento.
- Consulta de “mis reservas” y sus estados.

### 3. Agente
- Listado y registro de eventos (incluye ciudad y teatro).
- Consulta de reservas del sistema.
- Actualización del estado de las reservas.

### 4. Administrador
- Panel de resumen (totales de eventos, reservas, clientes, canceladas).
- Consulta de reportes (por ejemplo, top eventos).

### 5. Localización
- Gestión de países, departamentos y ciudades (soporte para ubicación de eventos).

---
# Instrucciones básicas para ejecutar el proyecto

## 1. Clonar el repositorio

```bash
git clone <https://github.com/diegopena01-droid/Proyecto_Integrador.git>
```

## 2. Backend (API + base de datos)

```bash
cd Backend
docker compose up -d
npm install
npm run db:init
npm run db:seed
npm run db:fix-passwords
npm start
```

### Servicios disponibles

| Servicio | URL / Puerto |
|----------|--------------|
| API | http://localhost:3000/api |
| Health | http://localhost:3000/api/health |
| PostgreSQL | Puerto 5433 (según docker-compose) |
| pgAdmin (si está en el compose) | http://localhost:8080 |

### Usuarios de prueba

Contraseña para todos: `123456`

| Rol | Correo |
|-----|--------|
| Cliente | cliente@checkevent.com |
| Agente | agente@checkevent.com |
| Administrador | admin@checkevent.com |

## 3. Frontend (Angular)

```bash
cd Frontend
npm install
ng serve 
```

Abrir en el navegador: http://localhost:4200