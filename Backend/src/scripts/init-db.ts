import fs from "fs";
import path from "path";
import { pool } from "../config/database";

async function main() {
  try {
    console.log("Creando tablas...");

    const sqlPath = path.join(__dirname, "../database/init.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await pool.query(sql);

    console.log("Tablas creadas correctamente");
  } catch (error) {
    console.error("Error al crear las tablas:", error);
  } finally {
    await pool.end();
  }
}

main();