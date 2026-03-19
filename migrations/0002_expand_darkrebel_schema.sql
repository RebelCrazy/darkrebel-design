-- Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  estatus TEXT NOT NULL DEFAULT 'Lead',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Colaboradores
CREATE TABLE IF NOT EXISTS colaboradores (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Proyectos (actualizado)
CREATE TABLE IF NOT EXISTS proyectos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  cliente_id TEXT,
  progreso INTEGER DEFAULT 0,
  estado TEXT,
  link_figma TEXT,
  uid TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tareas
CREATE TABLE IF NOT EXISTS tareas (
  id TEXT PRIMARY KEY,
  proyecto_id TEXT NOT NULL,
  colaborador_id TEXT,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  estado TEXT NOT NULL DEFAULT 'Pendiente',
  fecha_entrega DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
  FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id)
);

-- Plantillas
CREATE TABLE IF NOT EXISTS plantillas (
  id TEXT PRIMARY KEY,
  tipo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
