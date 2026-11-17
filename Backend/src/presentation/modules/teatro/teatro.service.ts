import { pool } from "../../../config/database";

export class TeatroService {
  public async getAll() {
    const result = await pool.query(
      `SELECT t.id, t.nombre, t.direccion, t.capacidad, t.ciudad_id,
              c.nombre AS ciudad
       FROM teatros t
       LEFT JOIN ciudades c ON c.id = t.ciudad_id
       ORDER BY t.nombre`
    );
    return result.rows;
  }
}