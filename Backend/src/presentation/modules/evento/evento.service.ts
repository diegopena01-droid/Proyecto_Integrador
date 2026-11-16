import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Evento, CreateEvento, UpdateEvento } from "../../../domain/interfaces/evento.interface";

export class EventoService {
  private baseSelect = `
    SELECT e.*,
           t.nombre AS teatro,
           c.nombre AS ciudad,
           u.nombre AS agente_nombre
    FROM eventos e
    LEFT JOIN teatros t ON t.id = e.teatro_id
    LEFT JOIN ciudades c ON c.id = e.ciudad_id
    LEFT JOIN usuarios u ON u.id = e.agente_id
  `;

  public async getAllEventos(): Promise<Evento[]> {
    const result = await pool.query<Evento>(`${this.baseSelect} ORDER BY e.fecha_inicio ASC`);
    return result.rows;
  }

  public async getEventoById(id: number): Promise<Evento> {
    const row = (await pool.query<Evento>(`${this.baseSelect} WHERE e.id = $1`, [id])).rows[0];
    if (!row) throw CustomError.notFound("Evento no encontrado");
    return row;
  }

  public async getEventoByCodigo(codigo: string): Promise<Evento> {
    const row = (await pool.query<Evento>(`${this.baseSelect} WHERE e.codigo = $1`, [codigo])).rows[0];
    if (!row) throw CustomError.notFound("Evento no encontrado");
    return row;
  }

  public async createEvento(data: CreateEvento): Promise<Evento> {
    const exists = await pool.query(`SELECT id FROM eventos WHERE codigo = $1`, [data.codigo]);
    if (exists.rows.length > 0) throw CustomError.badRequest("Ya existe un evento con ese código");

    const sql = `
      INSERT INTO eventos
        (codigo, nombre, descripcion, teatro_id, ciudad_id, fecha_inicio, hora_inicio,
         hora_fin, capacidad, precio, estado, imagen_url, agente_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
    `;
    const row = (await pool.query<Evento>(sql, [
      data.codigo, data.nombre, data.descripcion ?? null,
      data.teatro_id ?? null, data.ciudad_id ?? null,
      data.fecha_inicio, data.hora_inicio, data.hora_fin ?? null,
      data.capacidad, data.precio, data.estado || "Programado",
      data.imagen_url ?? null, data.agente_id ?? null,
    ])).rows[0];
    if (!row) throw CustomError.internalServer("No se pudo crear el evento");
    return row;
  }

  public async updateEvento(id: number, data: UpdateEvento): Promise<Evento> {
    const current = await this.getEventoById(id);
    const sql = `
      UPDATE eventos SET
        codigo = $1, nombre = $2, descripcion = $3, teatro_id = $4, ciudad_id = $5,
        fecha_inicio = $6, hora_inicio = $7, hora_fin = $8, capacidad = $9,
        precio = $10, estado = $11, imagen_url = $12, updated_at = NOW()
      WHERE id = $13
      RETURNING *
    `;
    const row = (await pool.query<Evento>(sql, [
      data.codigo ?? current.codigo,
      data.nombre ?? current.nombre,
      data.descripcion ?? current.descripcion,
      data.teatro_id ?? current.teatro_id,
      data.ciudad_id ?? current.ciudad_id,
      data.fecha_inicio ?? current.fecha_inicio,
      data.hora_inicio ?? current.hora_inicio,
      data.hora_fin ?? current.hora_fin,
      data.capacidad ?? current.capacidad,
      data.precio ?? current.precio,
      data.estado ?? current.estado,
      data.imagen_url ?? current.imagen_url,
      id,
    ])).rows[0];
    if (!row) throw CustomError.internalServer("No se pudo actualizar el evento");
    return row;
  }

  public async deleteEvento(id: number): Promise<boolean> {
    await this.getEventoById(id);
    const result = await pool.query(`DELETE FROM eventos WHERE id = $1 RETURNING id`, [id]);
    if (!result.rowCount) throw CustomError.internalServer("No se pudo eliminar el evento");
    return true;
  }
}