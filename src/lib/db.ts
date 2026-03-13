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

export async function listarProyectosActivos(): Promise<Proyecto[]> {
  const db = getDB();
  const query = `
    SELECT id, nombre, cliente_email, progreso, estado, link_figma
    FROM proyectos
    WHERE estado != 'Finalizado'
    ORDER BY updated_at DESC
  `;

  const result = await db.prepare(query).all<Proyecto>();
  return result.results ?? [];
}

export async function obtenerProyectoPorId(id: string): Promise<Proyecto | null> {
  const db = getDB();
  const query = `
    SELECT id, nombre, cliente_email, progreso, estado, link_figma
    FROM proyectos
    WHERE id = ?1
    LIMIT 1
  `;

  const result = await db.prepare(query).bind(id).first<Proyecto>();
  return result ?? null;
}

export type NuevoProyectoInput = {
  nombre: string;
  cliente_email: string;
  progreso: number;
  estado: EstadoProyecto;
  link_figma?: string;
};

export async function crearProyecto(input: NuevoProyectoInput): Promise<string> {
  const db = getDB();
  const id = crypto.randomUUID();

  const query = `
    INSERT INTO proyectos (id, nombre, cliente_email, progreso, estado, link_figma)
    VALUES (?1, ?2, ?3, ?4, ?5, ?6)
  `;

  await db
    .prepare(query)
    .bind(
      id,
      input.nombre,
      input.cliente_email,
      input.progreso,
      input.estado,
      input.link_figma || null
    )
    .run();

  return id;
}
