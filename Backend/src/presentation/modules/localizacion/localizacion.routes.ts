import { Router } from "express";
import { LocalizacionController } from "./localizacion.controller";

export class LocalizacionRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new LocalizacionController();

    router.get("/paises", controller.getAllPaises);
    router.get("/paises/:id", controller.getPaisById);
    router.post("/paises", controller.createPais);
    router.put("/paises/:id", controller.updatePais);
    router.delete("/paises/:id", controller.deletePais);

    router.get("/departamentos", controller.getAllDepartamentos);
    router.get("/departamentos/:id", controller.getDepartamentoById);
    router.post("/departamentos", controller.createDepartamento);
    router.put("/departamentos/:id", controller.updateDepartamento);
    router.delete("/departamentos/:id", controller.deleteDepartamento);

    router.get("/ciudades", controller.getAllCiudades);
    router.get("/ciudades/:id", controller.getCiudadById);
    router.post("/ciudades", controller.createCiudad);
    router.put("/ciudades/:id", controller.updateCiudad);
    router.delete("/ciudades/:id", controller.deleteCiudad);

    return router;
  }
}