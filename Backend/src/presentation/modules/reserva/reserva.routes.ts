import { Router } from "express";
import { ReservaController } from "./reserva.controller";
import { validateToken, authorizeRoles } from "../../middlewares/auth.middleware";

export class ReservaRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReservaController();

    router.use(validateToken);

    router.get("/mis-reservas", controller.getMisReservas);
    router.get("/", authorizeRoles("agente", "admin"), controller.getAllReservas);
    router.get("/:id", controller.getReservaById);
    router.post("/", authorizeRoles("cliente", "admin"), controller.createReserva);
    router.put("/:id", authorizeRoles("agente", "admin", "cliente"), controller.updateReserva);
    router.delete("/:id", authorizeRoles("agente", "admin"), controller.deleteReserva);

    return router;
  }
}