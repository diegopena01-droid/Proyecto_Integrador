import { Router } from "express";
import { EventoController } from "./evento.controller";
import { validateToken, authorizeRoles } from "../../../middlewares/auth.middleware";
export class EventoRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new EventoController();

    router.get("/", controller.getAllEventos);
    router.get("/codigo/:codigo", controller.getEventoByCodigo);
    router.get("/:id", controller.getEventoById);

    router.post("/", validateToken, authorizeRoles("agente", "admin"), controller.createEvento);
    router.put("/:id", validateToken, authorizeRoles("agente", "admin"), controller.updateEvento);
    router.delete("/:id", validateToken, authorizeRoles("agente", "admin"), controller.deleteEvento);

    return router;
  }
}