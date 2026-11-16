import { Router } from "express";
import { ReporteController } from "./reporte.controller";
import { validateToken, authorizeRoles } from "../../middlewares/auth.middleware";

export class ReporteRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReporteController();

    router.use(validateToken, authorizeRoles("admin"));

    router.get("/resumen", controller.getResumen);
    router.get("/reservas-por-estado", controller.getReservasPorEstado);
    router.get("/eventos-por-estado", controller.getEventosPorEstado);
    router.get("/top-eventos", controller.getTopEventos);

    return router;
  }
}