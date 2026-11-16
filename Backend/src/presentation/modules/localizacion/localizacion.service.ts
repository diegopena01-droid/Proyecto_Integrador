import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import { Pais, Departamento, Ciudad } from "../../../domain/interfaces/localizacion.interface";

export class LocalizacionService {

  public async getAllPaises(): Promise<Pais[]> {
    const result = await pool.query<Pais>(`SELECT * FROM paises ORDER BY nombre`);
    return result.rows;
  }

  public async getPaisById(id: number): Promise<Pais> {
    const row = (await pool.query<Pais>(`SELECT * FROM paises WHERE id = $1`, [id])).rows[0];
    if (!row) throw CustomError.notFound("País no encontrado");
    return row;
  }

  public async createPais(nombre: string, codigo: string): Promise<Pais> {
    const row = (await pool.query<Pais>(
      `INSERT INTO paises (nombre, codigo) VALUES ($1, $2) RETURNING *`,
      [nombre, codigo]
    )).rows[0];
    if (!row) throw CustomError.internalServer("No se pudo crear el país");
    return row;
  }

  public async updatePais(id: number, nombre: string, codigo: string): Promise<Pais> {
    const row = (await pool.query<Pais>(
      `UPDATE paises SET nombre = $1, codigo = $2 WHERE id = $3 RETURNING *`,
      [nombre, codigo, id]
    )).rows[0];
    if (!row) throw CustomError.notFound("País no encontrado");
    return row;
  }

  public async deletePais(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM paises WHERE id = $1 RETURNING id`, [id]);
    if (!result.rowCount) throw CustomError.notFound("País no encontrado");
    return true;
  }

  public async getAllDepartamentos(): Promise<Departamento[]> {
    const result = await pool.query<Departamento>(
      `SELECT d.*, p.nombre AS pais_nombre
       FROM departamentos d
       JOIN paises p ON p.id = d.pais_id
       ORDER BY d.nombre`
    );
    return result.rows;
  }

  public async getDepartamentoById(id: number): Promise<Departamento> {
    const row = (await pool.query<Departamento>(
      `SELECT d.*, p.nombre AS pais_nombre
       FROM departamentos d
       JOIN paises p ON p.id = d.pais_id
       WHERE d.id = $1`,
      [id]
    )).rows[0];
    if (!row) throw CustomError.notFound("Departamento no encontrado");
    return row;
  }

  public async createDepartamento(nombre: string, pais_id: number): Promise<Departamento> {
    const row = (await pool.query<Departamento>(
      `INSERT INTO departamentos (nombre, pais_id) VALUES ($1, $2) RETURNING *`,
      [nombre, pais_id]
    )).rows[0];
    if (!row) throw CustomError.internalServer("No se pudo crear el departamento");
    return row;
  }

  public async updateDepartamento(id: number, nombre: string, pais_id: number): Promise<Departamento> {
    const row = (await pool.query<Departamento>(
      `UPDATE departamentos SET nombre = $1, pais_id = $2 WHERE id = $3 RETURNING *`,
      [nombre, pais_id, id]
    )).rows[0];
    if (!row) throw CustomError.notFound("Departamento no encontrado");
    return row;
  }

  public async deleteDepartamento(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM departamentos WHERE id = $1 RETURNING id`, [id]);
    if (!result.rowCount) throw CustomError.notFound("Departamento no encontrado");
    return true;
  }

  public async getAllCiudades(): Promise<Ciudad[]> {
    const result = await pool.query<Ciudad>(
      `SELECT c.*, d.nombre AS departamento_nombre, p.nombre AS pais_nombre
       FROM ciudades c
       JOIN departamentos d ON d.id = c.departamento_id
       JOIN paises p ON p.id = d.pais_id
       ORDER BY c.nombre`
    );
    return result.rows;
  }

  public async getCiudadById(id: number): Promise<Ciudad> {
    const row = (await pool.query<Ciudad>(
      `SELECT c.*, d.nombre AS departamento_nombre
       FROM ciudades c
       JOIN departamentos d ON d.id = c.departamento_id
       WHERE c.id = $1`,
      [id]
    )).rows[0];
    if (!row) throw CustomError.notFound("Ciudad no encontrada");
    return row;
  }

  public async createCiudad(nombre: string, departamento_id: number): Promise<Ciudad> {
    const row = (await pool.query<Ciudad>(
      `INSERT INTO ciudades (nombre, departamento_id) VALUES ($1, $2) RETURNING *`,
      [nombre, departamento_id]
    )).rows[0];
    if (!row) throw CustomError.internalServer("No se pudo crear la ciudad");
    return row;
  }

  public async updateCiudad(id: number, nombre: string, departamento_id: number): Promise<Ciudad> {
    const row = (await pool.query<Ciudad>(
      `UPDATE ciudades SET nombre = $1, departamento_id = $2 WHERE id = $3 RETURNING *`,
      [nombre, departamento_id, id]
    )).rows[0];
    if (!row) throw CustomError.notFound("Ciudad no encontrada");
    return row;
  }

  public async deleteCiudad(id: number): Promise<boolean> {
    const result = await pool.query(`DELETE FROM ciudades WHERE id = $1 RETURNING id`, [id]);
    if (!result.rowCount) throw CustomError.notFound("Ciudad no encontrada");
    return true;
  }
}