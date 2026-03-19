// CRUD Clientes
export async function crearCliente(data: { nombre: string; email: string; estatus?: string }) {
  const db = getDB();
  const id = crypto.randomUUID();
  await db.prepare(`INSERT INTO clientes (id, nombre, email, estatus) VALUES (?1, ?2, ?3, ?4)`).bind(
    id, data.nombre, data.email, data.estatus || 'Lead'
  ).run();
  return id;
}
export async function actualizarCliente(id: string, data: any) {
  const db = getDB();
  await db.prepare(`UPDATE clientes SET nombre = ?2, email = ?3, estatus = ?4 WHERE id = ?1`).bind(
    id, data.nombre, data.email, data.estatus
  ).run();
}
export async function eliminarCliente(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM clientes WHERE id = ?`).bind(id).run();
}

// CRUD Tareas
export async function crearTarea(data: any) {
  const db = getDB();
  const id = crypto.randomUUID();
  await db.prepare(`INSERT INTO tareas (id, proyecto_id, colaborador_id, titulo, descripcion, estado, fecha_entrega, visible_cliente) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`).bind(
    id, data.proyecto_id, data.colaborador_id || null, data.titulo, data.descripcion, data.estado || 'Pendiente', data.fecha_entrega, data.visible_cliente !== false ? 1 : 0
  ).run();
  return id;
}
export async function actualizarTarea(id: string, data: any) {
  const db = getDB();
  await db.prepare(`UPDATE tareas SET titulo = ?2, descripcion = ?3, estado = ?4, fecha_entrega = ?5, visible_cliente = ?6 WHERE id = ?1`).bind(
    id, data.titulo, data.descripcion, data.estado, data.fecha_entrega, data.visible_cliente !== false ? 1 : 0
  ).run();
}
export async function eliminarTarea(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM tareas WHERE id = ?`).bind(id).run();
}

// CRUD Proyectos
export async function crearProyecto(data: any) {
  const db = getDB();
  const id = crypto.randomUUID();
  // Permitir ambos esquemas: cliente_id o cliente_email, y UID opcional
  await db.prepare(`INSERT INTO proyectos (id, nombre, cliente_id, progreso, estado, link_figma, uid) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`).bind(
    id, data.nombre, data.cliente_id || null, data.progreso || 0, data.estado, data.link_figma || null, data.uid || crypto.randomUUID()
  ).run();
  return id;
}
export async function actualizarProyecto(id: string, data: any) {
  const db = getDB();
  // Solo actualizar los campos relevantes
  await db.prepare(`UPDATE proyectos SET nombre = ?2, cliente_id = ?3, progreso = ?4, estado = ?5, link_figma = ?6 WHERE id = ?1`).bind(
    id, data.nombre, data.cliente_id, data.progreso, data.estado, data.link_figma
  ).run();
}
export async function eliminarProyecto(id: string) {
  const db = getDB();
  await db.prepare(`DELETE FROM proyectos WHERE id = ?`).bind(id).run();
}
// CRM: Clientes con conteo de proyectos activos
export async function obtenerClientesConProyectos() {
  const db = getDB();
  const query = `
    SELECT c.*, COUNT(p.id) as proyectos_activos
    FROM clientes c
    LEFT JOIN proyectos p ON p.cliente_id = c.id AND p.estado != 'Finalizado'
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `;
  const result = await db.prepare(query).all();
  return result.results ?? [];
}

// Tareas con info de proyecto y cliente
export async function obtenerTareasConProyectoYCliente() {
  const db = getDB();
  const query = `
    SELECT t.*, p.nombre as proyecto_nombre, p.uid as proyecto_uid, c.nombre as cliente_nombre
    FROM tareas t
    LEFT JOIN proyectos p ON t.proyecto_id = p.id
    LEFT JOIN clientes c ON p.cliente_id = c.id
    ORDER BY t.fecha_entrega ASC
  `;
  const result = await db.prepare(query).all();
  return result.results ?? [];
}

export const runtime = 'edge';
import type { D1Database } from "@cloudflare/workers-types";

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
  const db = getDB();
  const query = `SELECT * FROM proyectos ORDER BY created_at DESC`;
  const result = await db.prepare(query).all();
  return result.results ?? [];
}

export async function obtenerProyectoPorId(id: string) {
  const db = getDB();
  const query = `SELECT * FROM proyectos WHERE uid = ?1 OR id = ?1 LIMIT 1`;
  const result = await db.prepare(query).bind(id).first();
  return result ?? null;
}
