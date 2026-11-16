import cors from "cors";
import express, { Router } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { pool } from "../config/database";
import { swaggerSpec } from "../config/swagger";
import { Options } from "../domain/interfaces/server.interface";

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath;
    this.routes = options.routes;
  }

  async start(): Promise<void> {
    await this.databaseConnect();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(this.publicPath));
    this.app.use(this.routes);
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use((_req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.publicPath}/index.html`));
    });
    this.app.listen(this.port, () => {
      console.log(`Server Running on Port ${this.port}`);
    });
  }

  async databaseConnect() {
    try {
      await pool.query("SELECT 1");
      console.log("Conexión a PostgreSQL establecida correctamente");
    } catch (error) {
      console.error("Error al conectar con PostgreSQL:", error);
      throw error;
    }
  }
}