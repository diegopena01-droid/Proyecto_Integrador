import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../../config/database";
import { envs } from "../../../config/envs";
import { CustomError } from "../../../domain/errors/custom.error";
import { Usuario } from "../../../domain/interfaces/usuario.interface";

export class AuthService {
  public async login(email: string, password: string) {
    const sql = `SELECT id, nombre, email, password, rol, ciudad_id, activo FROM usuarios WHERE email = $1`;
    const user = (await pool.query<Usuario>(sql, [email])).rows[0];
    if (!user) throw CustomError.unauthorized("Credenciales inválidas");
    if (!user.activo) throw CustomError.forbidden("Usuario inactivo");

    const valid = await bcrypt.compare(password, user.password || "");
    if (!valid) throw CustomError.unauthorized("Credenciales inválidas");

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre },
      envs.JWT_SECRET,
      { expiresIn: envs.JWT_EXPIRES_IN as any }
    );

    const { password: _, ...usuario } = user;
    return { token, usuario };
  }

  public async register(data: {
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    ciudad_id?: number;
  }) {
    const exists = await pool.query(`SELECT id FROM usuarios WHERE email = $1`, [data.email]);
    if (exists.rows.length > 0) {
      throw CustomError.badRequest("El email ya está registrado");
    }

    const hash = await bcrypt.hash(data.password, 10);
    const rol = data.rol || "cliente";

    const sql = `
      INSERT INTO usuarios (nombre, email, password, rol, ciudad_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombre, email, rol, ciudad_id, activo
    `;
    const user = (await pool.query(sql, [
      data.nombre, data.email, hash, rol, data.ciudad_id ?? null,
    ])).rows[0];

    if (!user) throw CustomError.internalServer("No se pudo registrar el usuario");

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre },
      envs.JWT_SECRET,
      { expiresIn: envs.JWT_EXPIRES_IN as any }
    );

    return { token, usuario: user };
  }
}