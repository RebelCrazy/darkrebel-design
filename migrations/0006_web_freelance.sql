-- Campos orientados a proyectos web / freelance
ALTER TABLE proyectos ADD COLUMN url_produccion TEXT;
ALTER TABLE proyectos ADD COLUMN url_staging TEXT;
ALTER TABLE proyectos ADD COLUMN stack TEXT;
ALTER TABLE proyectos ADD COLUMN hosting TEXT;
ALTER TABLE proyectos ADD COLUMN notas_internas TEXT;

-- Presupuestos y propuestas enviadas (además de plantillas de texto)
CREATE TABLE IF NOT EXISTS propuestas (
  id TEXT PRIMARY KEY,
  proyecto_id TEXT,
  titulo TEXT NOT NULL,
  moneda TEXT NOT NULL DEFAULT 'MXN',
  total REAL NOT NULL DEFAULT 0,
  estado TEXT NOT NULL DEFAULT 'Borrador',
  items_json TEXT,
  notas TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

CREATE INDEX IF NOT EXISTS idx_propuestas_estado ON propuestas (estado);
CREATE INDEX IF NOT EXISTS idx_propuestas_proyecto ON propuestas (proyecto_id);
