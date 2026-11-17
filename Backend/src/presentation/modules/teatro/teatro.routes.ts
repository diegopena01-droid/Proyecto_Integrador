import { Router } from "express";
import { TeatroController } from "./teatro.controller";

export class TeatroRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TeatroController();
    router.get("/", controller.getAll);
    return router;
  }
}