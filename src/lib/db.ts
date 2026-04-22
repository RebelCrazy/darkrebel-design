import type { D1Database } from "@cloudflare/workers-types";

export const runtime = "edge";

async function getTableColumns(db: D1Database, tableName: string): Promise<Set<string>> {
  const result = await db.prepare(`PRAGMA table_info(${tableName})`).all<{ name: string }>();
  return new Set((result.results ?? []).map((row) => row.name));
}

function hasColumn(columns: Set<string>, name: string): boolean {
  return columns.has(name);
}

// CRUD Clientes
export async function crearCliente(data: any) {
  const db = getDB();
  const id = crypto.randomUUID();
  const columns = await getTableColumns(db, "clientes");
  const values: Record<string, unknown> = {
    id,
    nombre: data.nombre,
    email: data.email,
    estatus: data.estatus || "Lead",
    telefono: data.telefono || null,
    web: data.web || null,
    instagram: data.instagram || null,
    linkedin: data.linkedin || null,
    ubicacion: data.ubicacion || null,
    area_negocio: data.area_negocio || null,
    id_fiscal: data.id_fiscal || null,
    tipo_fiscal: data.tipo_fiscal || null,
    notas: data.notas || null,
  };
  const availableColumns = Object.keys(values).filter((column) => hasColumn(columns, column));
  const placeholders = availableColumns.map((_, index) => `?${index + 1}`);
  await db
    .prepare(`INSERT INTO clientes (${availableColumns.join(", ")}) VALUES (${placeholders.join(", ")})`)
    .bind(...availableColumns.map((column) => values[column]))
    .run();
  return id;
}
export async function actualizarCliente(id: string, data: any) {
  const db = getDB();
  const columns = await getTableColumns(db, "clientes");
  const updates = [
    ["nombre", data.nombre],
    ["email", data.email],
    ["estatus", data.estatus],
    ["telefono", data.telefono || null],
    ["web", data.web || null],
    ["instagram", data.instagram || null],
    ["linkedin", data.linkedin || null],
    ["ubicacion", data.ubicacion || null],
    ["area_negocio", data.area_negocio || null],
    ["id_fiscal", data.id_fiscal || null],
    ["tipo_fiscal", data.tipo_fiscal || null],
    ["notas", data.notas || null],
  ].filter(([column]) => hasColumn(columns, column)) as Array<[string, unknown]>;

  await db
    .prepare(
      `UPDATE clientes SET ${updates.map(([column], index) => `${column} = ?${index + 2}`).join(", ")} WHERE id = ?1`
    )
    .bind(id, ...updates.map(([, value]) => value))
    .run();
}
export async function eliminarCliente(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM clientes WHERE id = ?`).bind(id).run();
}

// Colaboradores
export async function obtenerColaboradores() {
  const db = getDB();
  const result = await db.prepare(`SELECT * FROM colaboradores ORDER BY nombre ASC`).all();
  return result.results ?? [];
}

export async function crearColaborador(data: { nombre: string; email: string }) {
  const db = getDB();
  const id = crypto.randomUUID();
  await db
    .prepare(`INSERT INTO colaboradores (id, nombre, email) VALUES (?1, ?2, ?3)`)
    .bind(id, data.nombre, data.email)
    .run();
  return id;
}

export async function actualizarColaborador(id: string, data: { nombre: string; email: string }) {
  const db = getDB();
  await db
    .prepare(`UPDATE colaboradores SET nombre = ?2, email = ?3 WHERE id = ?1`)
    .bind(id, data.nombre, data.email)
    .run();
}

export async function eliminarColaborador(id: string) {
  const db = getDB();
  await db.prepare(`UPDATE tareas SET colaborador_id = NULL WHERE colaborador_id = ?`).bind(id).run();
  await db.prepare(`DELETE FROM colaboradores WHERE id = ?`).bind(id).run();
}

// CRUD Tareas
export async function crearTarea(data: any) {
  const db = getDB();
  const id = crypto.randomUUID();
  const columns = await getTableColumns(db, "tareas");
  
  const values: Record<string, unknown> = {
    id,
    proyecto_id: data.proyecto_id,
    colaborador_id: data.colaborador_id || null,
    titulo: data.titulo,
    descripcion: data.descripcion || null,
    estado: data.estado || 'Pendiente',
    fecha_entrega: data.fecha_entrega || null,
    visible_cliente: data.visible_cliente !== false ? 1 : 0
  };

  const availableColumns = Object.keys(values).filter((column) => hasColumn(columns, column));
  const placeholders = availableColumns.map((_, index) => `?${index + 1}`);
  
  await db
    .prepare(`INSERT INTO tareas (${availableColumns.join(", ")}) VALUES (${placeholders.join(", ")})`)
    .bind(...availableColumns.map((column) => values[column]))
    .run();
    
  return id;
}
export async function actualizarTarea(id: string, data: any) {
  const db = getDB();
  const cur = await db.prepare(`SELECT * FROM tareas WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  if (!cur) return;
  const titulo = data.titulo ?? cur.titulo;
  const descripcion = data.descripcion !== undefined ? data.descripcion : cur.descripcion;
  const estado = data.estado ?? cur.estado;
  const fecha_entrega = data.fecha_entrega !== undefined ? data.fecha_entrega : cur.fecha_entrega;
  let vis = Number(cur.visible_cliente ?? 1);
  if (data.visible_cliente !== undefined) vis = data.visible_cliente !== false && data.visible_cliente !== 0 ? 1 : 0;
  let colaboradorId: string | null = (cur.colaborador_id as string | null) ?? null;
  if (Object.prototype.hasOwnProperty.call(data, "colaborador_id")) {
    colaboradorId = data.colaborador_id ? String(data.colaborador_id) : null;
  }
  await db
    .prepare(
      `UPDATE tareas SET titulo = ?2, descripcion = ?3, estado = ?4, fecha_entrega = ?5, visible_cliente = ?6, colaborador_id = ?7 WHERE id = ?1`
    )
    .bind(id, titulo, descripcion, estado, fecha_entrega, vis, colaboradorId)
    .run();
}
export async function eliminarTarea(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM tareas WHERE id = ?`).bind(id).run();
}

async function resolverClienteIdPorEmail(db: D1Database, email: string | undefined | null): Promise<string | null> {
  const trimmed = String(email ?? "").trim();
  if (!trimmed) return null;
  const row = await db.prepare(`SELECT id FROM clientes WHERE email = ?`).bind(trimmed).first<{ id: string }>();
  if (row?.id) return row.id;
  const id = crypto.randomUUID();
  const nombre = trimmed.includes("@") ? trimmed.split("@")[0] : trimmed;
  await db
    .prepare(`INSERT INTO clientes (id, nombre, email, estatus) VALUES (?1, ?2, ?3, 'Lead')`)
    .bind(id, nombre || "Cliente", trimmed)
    .run();
  return id;
}

// CRUD Proyectos
export async function crearProyecto(data: any) {
  const db = getDB();
  const id = crypto.randomUUID();
  const columns = await getTableColumns(db, "proyectos");
  const clienteId = hasColumn(columns, "cliente_id")
    ? data.cliente_id || (await resolverClienteIdPorEmail(db, data.cliente_email))
    : null;
  const values: Record<string, unknown> = {
    id,
    nombre: data.nombre,
    cliente_id: clienteId,
    cliente_email: data.cliente_email || null,
    progreso: data.progreso || 0,
    estado: data.estado,
    link_figma: data.link_figma || null,
    uid: data.uid || crypto.randomUUID(),
    url_produccion: data.url_produccion || null,
    url_staging: data.url_staging || null,
    stack: data.stack || null,
    hosting: data.hosting || null,
    notas_internas: data.notas_internas || null,
  };
  const availableColumns = Object.keys(values).filter((column) => hasColumn(columns, column));
  const placeholders = availableColumns.map((_, index) => `?${index + 1}`);
  await db
    .prepare(`INSERT INTO proyectos (${availableColumns.join(", ")}) VALUES (${placeholders.join(", ")})`)
    .bind(...availableColumns.map((column) => values[column]))
    .run();
  return id;
}
export async function actualizarProyecto(id: string, data: any) {
  const db = getDB();
  const columns = await getTableColumns(db, "proyectos");
  const current = await db.prepare(`SELECT * FROM proyectos WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  if (!current) return;

  const nombre = data.nombre ?? current.nombre;
  const progreso = data.progreso ?? current.progreso;
  const estado = data.estado ?? current.estado;
  const link_figma = data.link_figma !== undefined ? data.link_figma : current.link_figma;
  const url_produccion =
    data.url_produccion !== undefined ? data.url_produccion : (current.url_produccion as string | null);
  const url_staging = data.url_staging !== undefined ? data.url_staging : (current.url_staging as string | null);
  const stack = data.stack !== undefined ? data.stack : (current.stack as string | null);
  const hosting = data.hosting !== undefined ? data.hosting : (current.hosting as string | null);
  const notas_internas =
    data.notas_internas !== undefined ? data.notas_internas : (current.notas_internas as string | null);

  let clienteId = hasColumn(columns, "cliente_id") ? ((current.cliente_id as string | null) ?? null) : null;
  if (hasColumn(columns, "cliente_id")) {
    if (data.cliente_id !== undefined) {
      clienteId = data.cliente_id as string | null;
    } else if (Object.prototype.hasOwnProperty.call(data, "cliente_email")) {
      clienteId = await resolverClienteIdPorEmail(db, data.cliente_email);
    }
  }

  const updates = [
    ["nombre", nombre],
    ["cliente_id", clienteId],
    [
      "cliente_email",
      data.cliente_email !== undefined ? data.cliente_email : (current.cliente_email as string | null),
    ],
    ["progreso", progreso],
    ["estado", estado],
    ["link_figma", link_figma],
    ["url_produccion", url_produccion],
    ["url_staging", url_staging],
    ["stack", stack],
    ["hosting", hosting],
    ["notas_internas", notas_internas],
  ].filter(([column]) => hasColumn(columns, column)) as Array<[string, unknown]>;

  await db
    .prepare(
      `UPDATE proyectos SET ${updates.map(([column], index) => `${column} = ?${index + 2}`).join(", ")} WHERE id = ?1`
    )
    .bind(id, ...updates.map(([, value]) => value))
    .run();
}
export async function eliminarProyecto(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM proyectos WHERE id = ?`).bind(id).run();
}
// CRM: Clientes con conteo de proyectos activos
export async function obtenerClientesConProyectos() {
  const db = getDB();
  const projectColumns = await getTableColumns(db, "proyectos");
  const projectJoin = hasColumn(projectColumns, "cliente_id")
    ? "p.cliente_id = c.id"
    : "p.cliente_email = c.email";
  const query = `
    SELECT c.*, COUNT(p.id) as proyectos_activos
    FROM clientes c
    LEFT JOIN proyectos p ON ${projectJoin} AND p.estado != 'Finalizado'
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `;
  const result = await db.prepare(query).all();
  return result.results ?? [];
}

// Tareas con info de proyecto y cliente
export async function obtenerTareasConProyectoYCliente() {
  const db = getDB();
  const projectColumns = await getTableColumns(db, "proyectos");
  const projectJoin = hasColumn(projectColumns, "cliente_id")
    ? "p.cliente_id = c.id"
    : "p.cliente_email = c.email";

  const query = `
    SELECT t.*, p.nombre as proyecto_nombre, p.uid as proyecto_uid, c.nombre as cliente_nombre, col.nombre as colaborador_nombre
    FROM tareas t
    LEFT JOIN proyectos p ON t.proyecto_id = p.id
    LEFT JOIN clientes c ON ${projectJoin}
    LEFT JOIN colaboradores col ON t.colaborador_id = col.id
    ORDER BY t.fecha_entrega ASC
  `;
  const result = await db.prepare(query).all();
  return result.results ?? [];
}

// Plantillas (brief, contratos, cotizaciones — equivalente a páginas de Notion)
export async function obtenerPlantillas(tipo?: string) {
  const db = getDB();
  if (tipo) {
    const result = await db.prepare(`SELECT * FROM plantillas WHERE TRIM(tipo) = TRIM(?1) ORDER BY created_at DESC`).bind(tipo).all();
    return result.results ?? [];
  }
  const result = await db.prepare(`SELECT * FROM plantillas ORDER BY created_at DESC`).all();
  return result.results ?? [];
}

export async function obtenerPlantillaPorId(id: string) {
  const db = getDB();
  const row = await db.prepare(`SELECT * FROM plantillas WHERE id = ?`).bind(id).first();
  return row ?? null;
}

export async function crearPlantilla(data: { nombre: string; tipo: string; contenido: string }) {
  const db = getDB();
  const id = crypto.randomUUID();
  await db
    .prepare(`INSERT INTO plantillas (id, nombre, tipo, contenido) VALUES (?1, ?2, ?3, ?4)`)
    .bind(id, data.nombre, data.tipo, data.contenido)
    .run();
  return id;
}

export async function actualizarPlantilla(id: string, data: { nombre?: string; tipo?: string; contenido?: string }) {
  const db = getDB();
  const current = await db.prepare(`SELECT * FROM plantillas WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  if (!current) return;
  const nombre = data.nombre ?? current.nombre;
  const tipo = data.tipo ?? current.tipo;
  const contenido = data.contenido !== undefined ? data.contenido : current.contenido;
  await db
    .prepare(`UPDATE plantillas SET nombre = ?2, tipo = ?3, contenido = ?4 WHERE id = ?1`)
    .bind(id, nombre, tipo, contenido)
    .run();
}

export async function eliminarPlantilla(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM plantillas WHERE id = ?`).bind(id).run();
}

// Propuestas / presupuestos
export async function obtenerPropuestas() {
  const db = getDB();
  const projectColumns = await getTableColumns(db, "proyectos");
  const projectJoin = hasColumn(projectColumns, "cliente_id")
    ? "p.cliente_id = c.id"
    : "p.cliente_email = c.email";

  const query = `
    SELECT pr.*, p.nombre AS proyecto_nombre, c.email AS cliente_email
    FROM propuestas pr
    LEFT JOIN proyectos p ON pr.proyecto_id = p.id
    LEFT JOIN clientes c ON ${projectJoin}
    ORDER BY pr.created_at DESC
  `;
  const result = await db.prepare(query).all();
  return result.results ?? [];
}

export async function crearPropuesta(data: {
  proyecto_id?: string | null;
  titulo: string;
  moneda?: string;
  total?: number;
  estado?: string;
  items_json?: string;
  notas?: string;
}) {
  const db = getDB();
  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO propuestas (id, proyecto_id, titulo, moneda, total, estado, items_json, notas) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
    )
    .bind(
      id,
      data.proyecto_id || null,
      data.titulo,
      data.moneda || "MXN",
      data.total ?? 0,
      data.estado || "Borrador",
      data.items_json || "[]",
      data.notas || null
    )
    .run();
  return id;
}

export async function actualizarPropuesta(id: string, data: Record<string, unknown>) {
  const db = getDB();
  const current = await db.prepare(`SELECT * FROM propuestas WHERE id = ?`).bind(id).first<Record<string, unknown>>();
  if (!current) return;
  const titulo = (data.titulo ?? current.titulo) as string;
  const proyecto_id =
    data.proyecto_id !== undefined ? (data.proyecto_id as string | null) : (current.proyecto_id as string | null);
  const moneda = (data.moneda ?? current.moneda) as string;
  const total = data.total !== undefined ? Number(data.total) : Number(current.total ?? 0);
  const estado = (data.estado ?? current.estado) as string;
  const items_json = (data.items_json !== undefined ? data.items_json : current.items_json) as string;
  const notas = data.notas !== undefined ? (data.notas as string | null) : (current.notas as string | null);
  await db
    .prepare(
      `UPDATE propuestas SET proyecto_id = ?2, titulo = ?3, moneda = ?4, total = ?5, estado = ?6, items_json = ?7, notas = ?8 WHERE id = ?1`
    )
    .bind(id, proyecto_id, titulo, moneda, total, estado, items_json || "[]", notas)
    .run();
}

export async function eliminarPropuesta(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM propuestas WHERE id = ?`).bind(id).run();
}

export type EstadoProyecto = "Planeación" | "En Desarrollo" | "Finalizado";

export type Proyecto = {
  id: string;
  nombre: string;
  cliente_email: string;
  progreso: number;
  estado: EstadoProyecto;
  link_figma: string | null;
};

function getDB(): D1Database {
  const db = (process.env as unknown as { DB?: D1Database }).DB;

  if (!db) {
    throw new Error("No se encontro process.env.DB. Revisa el binding D1 en Cloudflare.");
  }

  return db;
}


export async function obtenerProyectos() {
  try {
    const db = getDB();
    // Simple query sin joins para evitar errores
    const columns = await getTableColumns(db, "proyectos");
    const orderBy = hasColumn(columns, "updated_at") ? "updated_at" : "created_at";
    
    const result = await db.prepare(`
      SELECT * FROM proyectos
      ORDER BY ${orderBy} DESC LIMIT 100
    `).all();
    
    if (!result.results) return [];
    
    // Enriquecer con datos del cliente si es posible
    const proyectos = result.results as any[];
    for (const proyecto of proyectos) {
      if (proyecto.cliente_id) {
        try {
          const clienteResult = await db.prepare(`
            SELECT email, nombre FROM clientes WHERE id = ?
          `).bind(proyecto.cliente_id).first();
          
          if (clienteResult) {
            proyecto.cliente_email = clienteResult.email;
            proyecto.cliente_nombre = clienteResult.nombre;
          }
        } catch (e) {
          console.error("Error obteniendo cliente:", e);
        }
      }
    }
    
    return proyectos;
  } catch (error) {
    console.error("Error en obtenerProyectos:", error);
    return [];
  }
}

export async function obtenerProyectoPorId(id: string) {
  const db = getDB();
  const columns = await getTableColumns(db, "proyectos");
  const hasClienteId = hasColumn(columns, "cliente_id");
  const hasClienteEmail = hasColumn(columns, "cliente_email");
  const whereClause = hasColumn(columns, "uid") ? "p.uid = ?1 OR p.id = ?1" : "p.id = ?1";
  const clienteEmailSelect = hasClienteEmail ? "COALESCE(c.email, p.cliente_email)" : "c.email";
  const query = hasClienteId
    ? `
      SELECT p.*, ${clienteEmailSelect} AS cliente_email
      FROM proyectos p
      LEFT JOIN clientes c ON p.cliente_id = c.id
      WHERE ${whereClause}
      LIMIT 1
    `
    : `
      SELECT p.*
      FROM proyectos p
      WHERE ${whereClause}
      LIMIT 1
    `;
  const result = await db.prepare(query).bind(id).first();
  return result ?? null;
}

// ZOHO TOKENS
export async function guardarZohoTokens(data: {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type?: string;
  scope?: string;
}) {
  const db = getDB();
  await db.prepare(`INSERT INTO zoho_tokens (access_token, refresh_token, expires_in, token_type, scope) VALUES (?1, ?2, ?3, ?4, ?5)`).bind(
    data.access_token,
    data.refresh_token,
    data.expires_in,
    data.token_type || null,
    data.scope || null
  ).run();
}

export async function obtenerZohoTokenActual() {
  const db = getDB();
  // Obtiene el token más reciente
  const row = await db.prepare(`SELECT * FROM zoho_tokens ORDER BY created_at DESC LIMIT 1`).first();
  return row ?? null;
}

export async function refrescarZohoToken(refresh_token: string) {
  const client_id = '1000.OONQK4REOQ6C4UKGCH6912DLS1MYWI';
  const client_secret = '4336496defead834211ee2bc9340851811bbc8a070';
  const redirect_uri = 'https://proyectos.darkrebel.store/api/zoho/callback';
  const params = new URLSearchParams({
    refresh_token,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: 'refresh_token',
  });
  const tokenRes = await fetch('https://accounts.zoho.com/oauth/v2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = await tokenRes.json();
  if (data.access_token) {
    await guardarZohoTokens(data);
  }
  return data;
}
