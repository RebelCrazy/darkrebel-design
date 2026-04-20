-- ====================================
-- DATOS DE PRUEBA PARA PANEL ADMIN
-- ====================================
-- Versión segura - Solo columnas que existen

-- 1. CREAR CLIENTE PRIMERO
INSERT INTO clientes (id, nombre, email, estatus)
VALUES ('cli-techstartup-001', 'TechStartup México S.A.', 'contacto@techstartup.mx', 'Cliente Activo');

-- 2. CREAR PROYECTO (sin referencia a cliente por si no existe la FK)
INSERT INTO proyectos (id, nombre, progreso, estado, link_figma, uid)
VALUES ('proy-techstartup-001', 'Rediseño Web - TechStartup', 75, 'En Desarrollo', 'https://www.figma.com/file/tech-startup-2026', 'uid-ts-2026-001');

-- 3. CREAR COLABORADORES
INSERT INTO colaboradores (id, nombre, email) VALUES ('col-carlos-001', 'Carlos Mendez', 'carlos@darkrebel.com');
INSERT INTO colaboradores (id, nombre, email) VALUES ('col-sofia-001', 'Sofia Gutierrez', 'sofia@darkrebel.com');
INSERT INTO colaboradores (id, nombre, email) VALUES ('col-miguel-001', 'Miguel Torres', 'miguel@darkrebel.com');

-- 4. CREAR TAREAS
INSERT INTO tareas (id, proyecto_id, colaborador_id, titulo, descripcion, estado, fecha_entrega, visible_cliente)
VALUES ('tarea-001', 'proy-techstartup-001', 'col-carlos-001', 'Diseño de wireframes', 'Crear wireframes de todas las páginas principales', 'Completada', '2026-03-15', 1);

INSERT INTO tareas (id, proyecto_id, colaborador_id, titulo, descripcion, estado, fecha_entrega, visible_cliente)
VALUES ('tarea-002', 'proy-techstartup-001', 'col-sofia-001', 'Implementación Frontend', 'Maquetar todos los componentes en React', 'En Progreso', '2026-04-15', 1);

INSERT INTO tareas (id, proyecto_id, colaborador_id, titulo, descripcion, estado, fecha_entrega, visible_cliente)
VALUES ('tarea-003', 'proy-techstartup-001', 'col-miguel-001', 'Testing y QA', 'Pruebas de funcionalidad y compatibilidad', 'Pendiente', '2026-04-25', 1);

INSERT INTO tareas (id, proyecto_id, colaborador_id, titulo, descripcion, estado, fecha_entrega, visible_cliente)
VALUES ('tarea-004', 'proy-techstartup-001', NULL, 'Optimización SEO', 'Implementar meta tags y optimizaciones SEO', 'Pendiente', '2026-04-30', 0);

-- ====================================
-- VERIFICAR RESULTADOS
-- ====================================
SELECT 'CLIENTES CREADOS:' as seccion;
SELECT id, nombre, email, estatus FROM clientes WHERE id = 'cli-techstartup-001';

SELECT 'PROYECTOS CREADOS:' as seccion;
SELECT id, nombre, estado, progreso FROM proyectos WHERE id = 'proy-techstartup-001';

SELECT 'COLABORADORES CREADOS:' as seccion;
SELECT id, nombre, email FROM colaboradores WHERE id LIKE 'col-%';

SELECT 'TAREAS CREADAS:' as seccion;
SELECT id, proyecto_id, titulo, estado FROM tareas WHERE id LIKE 'tarea-%';
