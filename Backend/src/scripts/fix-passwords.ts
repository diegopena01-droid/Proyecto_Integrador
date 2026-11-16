import bcrypt from "bcryptjs";
import { pool } from "../config/database";

async function main() {
  try {
    const hash = await bcrypt.hash("123456", 10);
    console.log("Hash generado:", hash);

    const result = await pool.query(
      `UPDATE usuarios 
       SET password = $1 
       WHERE email LIKE '%@checkevent.com' 
       RETURNING email`,
      [hash]
    );

    console.log("Usuarios actualizados:");
    result.rows.forEach((r) => console.log(" -", r.email));
    console.log("\n Password para todos: 123456");
  } catch (error) {
    console.error("Error al actualizar passwords:", error);
  } finally {
    await pool.end();
  }
}

main();