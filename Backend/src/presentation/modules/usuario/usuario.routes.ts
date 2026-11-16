import { Router } from "express";
import { UsuarioController } from "./usuario.controller";
import { validateToken, authorizeRoles } from "../../middlewares/auth.middleware";

export class UsuarioRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UsuarioController();

    router.use(validateToken, authorizeRoles("admin"));

    router.get("/", controller.getAllUsuarios);
    router.get("/:id", controller.getUsuarioById);
    router.put("/:id", controller.updateUsuario);
    router.delete("/:id", controller.deleteUsuario);

    return router;
  }
}