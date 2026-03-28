-- Expone a la vista cliente qué tareas son visibles (portal /p/[uid])
ALTER TABLE tareas ADD COLUMN visible_cliente INTEGER NOT NULL DEFAULT 1;
