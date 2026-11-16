import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Reserva, CreateReserva, UpdateReserva } from "../../../domain/interfaces/reserva.interface";

export class ReservaService {
  private baseSelect = `
    SELECT r.*,
           u.nombre AS cliente_nombre,
           e.nombre AS evento_nombre,
           e.codigo AS evento_codigo
    FROM reservas r
    JOIN usuarios u ON u.id = r.usuario_id
    JOIN eventos e ON e.id = r.evento_id
  `;

  public async getAllReservas(): Promise<Reserva[]> {
    const result = await pool.query<Reserva>(`${this.baseSelect} ORDER BY r.created_at DESC`);
    return result.rows;
  }

  public async getReservaById(id: number): Promise<Reserva> {
    const row = (await pool.query<Reserva>(`${this.baseSelect} WHERE r.id = $1`, [id])).rows[0];
    if (!row) throw CustomError.notFound("Reserva no encontrada");
    return row;
  }

  public async getReservasByUsuario(usuarioId: number): Promise<Reserva[]> {
    const result = await pool.query<Reserva>(
      `${this.baseSelect} WHERE r.usuario_id = $1 ORDER BY r.created_at DESC`,
      [usuarioId]
    );
    return result.rows;
  }

  public async createReserva(data: CreateReserva): Promise<Reserva> {
    const eventoRes = await pool.query(
      `SELECT id, precio, capacidad, estado FROM eventos WHERE id = $1`,
      [data.evento_id]
    );
    const evento = eventoRes.rows[0];
    if (!evento) throw CustomError.notFound("Evento no encontrado");
    if (evento.estado === "Cancelado" || evento.estado === "Finalizado") {
      throw CustomError.badRequest("No se puede reservar un evento cancelado o finalizado");
    }
    if (data.numero_entradas > evento.capacidad) {
      throw CustomError.badRequest("No hay suficiente capacidad disponible");
    }

    const valor_total = Number(evento.precio) * data.numero_entradas;
    const codigo = `RES-${Date.now()}`;

    const row = (await pool.query<Reserva>(
      `INSERT INTO reservas
        (codigo, usuario_id, evento_id, numero_entradas, valor_total, observaciones, estado)
       VALUES ($1,$2,$3,$4,$5,$6,'Reservada')
       RETURNING *`,
      [codigo, data.usuario_id, data.evento_id, data.numero_entradas, valor_total, data.observaciones ?? null]
    )).rows[0];
    if (!row) throw CustomError.internalServer("No se pudo crear la reserva");
    return row;
  }

  public async updateReserva(id: number, data: UpdateReserva): Promise<Reserva> {
    const current = await this.getReservaById(id);
    let valor_total = current.valor_total;
    if (data.numero_entradas && data.numero_entradas !== current.numero_entradas) {
      const eventoRes = await pool.query(`SELECT precio FROM eventos WHERE id = $1`, [current.evento_id]);
      valor_total = Number(eventoRes.rows[0].precio) * data.numero_entradas;
    }
    const row = (await pool.query<Reserva>(
      `UPDATE reservas SET
        numero_entradas = $1, valor_total = $2, observaciones = $3, estado = $4, updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [
        data.numero_entradas ?? current.numero_entradas,
        valor_total,
        data.observaciones ?? current.observaciones,
        data.estado ?? current.estado,
        id,
      ]
    )).rows[0];
    if (!row) throw CustomError.internalServer("No se pudo actualizar la reserva");
    return row;
  }

  public async deleteReserva(id: number): Promise<boolean> {
    await this.getReservaById(id);
    const result = await pool.query(`DELETE FROM reservas WHERE id = $1 RETURNING id`, [id]);
    if (!result.rowCount) throw CustomError.internalServer("No se pudo eliminar la reserva");
    return true;
  }
}