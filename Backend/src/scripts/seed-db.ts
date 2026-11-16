import fs from "fs";
import path from "path";
import { pool } from "../config/database";

async function main() {
  try {
    console.log("Insertando datos de prueba...");

    const sqlPath = path.join(__dirname, "../database/seed.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await pool.query(sql);

    console.log("Datos de prueba insertados correctamente");
  } catch (error) {
    console.error("Error al insertar los datos:", error);
  } finally {
    await pool.end();
  }
}

main();