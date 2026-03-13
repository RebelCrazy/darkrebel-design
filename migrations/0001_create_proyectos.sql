CREATE TABLE IF NOT EXISTS proyectos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  progreso INTEGER NOT NULL CHECK (progreso >= 0 AND progreso <= 100),
  estado TEXT NOT NULL CHECK (estado IN ('Planeación', 'En Desarrollo', 'Finalizado')),
  link_figma TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_proyectos_estado ON proyectos (estado);
CREATE INDEX IF NOT EXISTS idx_proyectos_updated_at ON proyectos (updated_at DESC);

CREATE TRIGGER IF NOT EXISTS trg_proyectos_updated_at
AFTER UPDATE ON proyectos
FOR EACH ROW
BEGIN
  UPDATE proyectos
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = OLD.id;
END;
