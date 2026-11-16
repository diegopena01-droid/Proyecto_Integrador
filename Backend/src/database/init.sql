CREATE TABLE IF NOT EXISTS paises (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL UNIQUE,
  codigo      VARCHAR(10)  NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departamentos (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  pais_id     INTEGER NOT NULL REFERENCES paises(id) ON DELETE CASCADE,
  created_at  TIMESTAMP DEFAULT NOW(),
  UNIQUE (nombre, pais_id)
);

CREATE TABLE IF NOT EXISTS ciudades (
  id               SERIAL PRIMARY KEY,
  nombre           VARCHAR(100) NOT NULL,
  departamento_id  INTEGER NOT NULL REFERENCES departamentos(id) ON DELETE CASCADE,
  created_at       TIMESTAMP DEFAULT NOW(),
  UNIQUE (nombre, departamento_id)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(150) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  rol         VARCHAR(20)  NOT NULL CHECK (rol IN ('cliente', 'agente', 'admin')),
  ciudad_id   INTEGER REFERENCES ciudades(id) ON DELETE SET NULL,
  activo      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teatros (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(150) NOT NULL,
  direccion   VARCHAR(255),
  ciudad_id   INTEGER REFERENCES ciudades(id) ON DELETE SET NULL,
  capacidad   INTEGER DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS eventos (
  id           SERIAL PRIMARY KEY,
  codigo       VARCHAR(20)  NOT NULL UNIQUE,
  nombre       VARCHAR(200) NOT NULL,
  descripcion  TEXT,
  teatro_id    INTEGER REFERENCES teatros(id) ON DELETE SET NULL,
  ciudad_id    INTEGER REFERENCES ciudades(id) ON DELETE SET NULL,
  fecha_inicio DATE NOT NULL,
  hora_inicio  TIME NOT NULL,
  hora_fin     TIME,
  capacidad    INTEGER NOT NULL DEFAULT 0,
  precio       NUMERIC(12, 2) NOT NULL DEFAULT 0,
  estado       VARCHAR(30) NOT NULL DEFAULT 'Programado'
               CHECK (estado IN ('Programado', 'En Boletería', 'En Vivo', 'Finalizado', 'Cancelado')),
  imagen_url   TEXT,
  agente_id    INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservas (
  id               SERIAL PRIMARY KEY,
  codigo           VARCHAR(30) NOT NULL UNIQUE,
  usuario_id       INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  evento_id        INTEGER NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  numero_entradas  INTEGER NOT NULL CHECK (numero_entradas > 0),
  valor_total      NUMERIC(12, 2) NOT NULL DEFAULT 0,
  observaciones    TEXT,
  estado           VARCHAR(30) NOT NULL DEFAULT 'Reservada'
                   CHECK (estado IN ('Reservada', 'Confirmada', 'Cancelada', 'Asistida')),
  created_at       TIMESTAMP DEFAULT NOW(),
  updated_at       TIMESTAMP DEFAULT NOW()
);