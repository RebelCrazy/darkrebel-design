-- Cliente de prueba
INSERT INTO clientes (id, nombre, email, estatus) VALUES ('cli1', 'Inmobiliaria GDL', 'contacto@gdl.com', 'Cliente Activo');

-- Colaborador de prueba
INSERT INTO colaboradores (id, nombre, email) VALUES ('col1', 'Mariana Ríos', 'mariana@darkrebel.com');

-- Proyecto de prueba
INSERT INTO proyectos (id, nombre, cliente_id, progreso, estado, link_figma, uid) VALUES (
  'proy1', 'Proyecto Branding GDL', 'cli1', 65, 'En Desarrollo', 'https://www.figma.com/file/abc123', 'public-uid-1234'
);

-- Tareas de prueba
INSERT INTO tareas (id, proyecto_id, colaborador_id, titulo, descripcion, estado, fecha_entrega) VALUES
  ('t1', 'proy1', NULL, 'Diseño de Logo', 'Crear logo para el proyecto', 'Pendiente', '2026-03-25'),
  ('t2', 'proy1', 'col1', 'Revisión de Contrato', 'Revisar y ajustar contrato', 'En Progreso', '2026-03-28'),
  ('t3', 'proy1', NULL, 'Sesión fotográfica en Zapopan', 'Fotografía de locación', 'Completada', '2026-04-01');

-- Plantilla de ejemplo
INSERT INTO plantillas (id, tipo, contenido) VALUES ('plant1', 'contrato', '# Contrato Dark Rebel\nContenido de ejemplo...');
