-- Tabla para almacenar tokens de Zoho
CREATE TABLE IF NOT EXISTS zoho_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_in INTEGER NOT NULL,
    token_type TEXT,
    scope TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
