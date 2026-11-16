import { pool } from "../../../config/database";

export class ReporteService {
  public async getResumen() {
    const [eventos, reservas, clientes, canceladas] = await Promise.all([
      pool.query(`SELECT COUNT(*)::int AS total FROM eventos`),
      pool.query(`SELECT COUNT(*)::int AS total FROM reservas`),
      pool.query(`SELECT COUNT(*)::int AS total FROM usuarios WHERE rol = 'cliente'`),
      pool.query(`SELECT COUNT(*)::int AS total FROM reservas WHERE estado = 'Cancelada'`),
    ]);
    return {
      total_eventos: eventos.rows[0].total,
      total_reservas: reservas.rows[0].total,
      total_clientes: clientes.rows[0].total,
      reservas_canceladas: canceladas.rows[0].total,
    };
  }

  public async getReservasPorEstado() {
    const result = await pool.query(
      `SELECT estado, COUNT(*)::int AS cantidad FROM reservas GROUP BY estado ORDER BY cantidad DESC`
    );
    return result.rows;
  }

  public async getEventosPorEstado() {
    const result = await pool.query(
      `SELECT estado, COUNT(*)::int AS cantidad FROM eventos GROUP BY estado ORDER BY cantidad DESC`
    );
    return result.rows;
  }

  public async getTopEventos() {
    const result = await pool.query(
      `SELECT e.codigo, e.nombre, COUNT(r.id)::int AS total_reservas,
              COALESCE(SUM(r.numero_entradas), 0)::int AS total_entradas,
              COALESCE(SUM(r.valor_total), 0)::numeric AS ingresos
       FROM eventos e
       LEFT JOIN reservas r ON r.evento_id = e.id AND r.estado <> 'Cancelada'
       GROUP BY e.id
       ORDER BY total_reservas DESC
       LIMIT 10`
    );
    return result.rows;
  }
}