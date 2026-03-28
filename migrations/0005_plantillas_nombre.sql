ALTER TABLE plantillas ADD COLUMN nombre TEXT NOT NULL DEFAULT '';

UPDATE plantillas SET nombre = 'Contrato Dark Rebel (ejemplo)'
WHERE id = 'plant1' AND (nombre = '' OR nombre IS NULL);
