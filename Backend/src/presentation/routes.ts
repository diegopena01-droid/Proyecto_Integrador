import { Router } from "express";
import { AuthRoutes } from "./modules/auth/auth.routes";
import { LocalizacionRoutes } from "./modules/localizacion/localizacion.routes";
import { UsuarioRoutes } from "./modules/usuario/usuario.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    apiRouter.use("/auth", AuthRoutes.routes);
    apiRouter.use("/localizacion", LocalizacionRoutes.routes);
    apiRouter.use("/usuarios", UsuarioRoutes.routes);

    apiRouter.get("/health", (_req, res) => {
      res.json({ ok: true, message: "CheckEvent API running" });
    });

    router.use("/api", apiRouter);
    return router;
  }
}