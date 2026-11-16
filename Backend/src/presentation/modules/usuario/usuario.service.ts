import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { UpdateUsuario } from "../../../domain/interfaces/usuario.interface";

export class UsuarioService {

  public async getAllUsuarios() {
    const result = await pool.query(
      `SELECT id, nombre, email, rol, ciudad_id, activo, created_at
       FROM usuarios
       ORDER BY nombre`
    );
    return result.rows;
  }

  public async getUsuarioById(id: number) {
    const row = (await pool.query(
      `SELECT id, nombre, email, rol, ciudad_id, activo, created_at
       FROM usuarios
       WHERE id = $1`,
      [id]
    )).rows[0];

    if (!row) throw CustomError.notFound("Usuario no encontrado");
    return row;
  }

  public async updateUsuario(id: number, data: UpdateUsuario) {
    const current = await this.getUsuarioById(id);

    const row = (await pool.query(
      `UPDATE usuarios SET
        nombre = $1,
        email = $2,
        rol = $3,
        ciudad_id = $4,
        activo = $5,
        updated_at = NOW()
       WHERE id = $6
       RETURNING id, nombre, email, rol, ciudad_id, activo`,
      [
        data.nombre ?? current.nombre,
        data.email ?? current.email,
        data.rol ?? current.rol,
        data.ciudad_id ?? current.ciudad_id,
        data.activo ?? current.activo,
        id,
      ]
    )).rows[0];

    if (!row) throw CustomError.internalServer("No se pudo actualizar el usuario");
    return row;
  }

  public async deleteUsuario(id: number): Promise<boolean> {
    await this.getUsuarioById(id); // verifica que exista

    const result = await pool.query(
      `DELETE FROM usuarios WHERE id = $1 RETURNING id`,
      [id]
    );

    if (!result.rowCount) {
      throw CustomError.internalServer("No se pudo eliminar el usuario");
    }

    return true;
  }
}