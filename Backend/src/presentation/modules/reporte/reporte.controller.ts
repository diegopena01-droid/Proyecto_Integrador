import { Request, Response } from "express";
import { ReporteService } from "./reporte.service";
import { HandleError } from "../../../domain/errors/handle.error";

export class ReporteController {
  private readonly service = new ReporteService();

  getResumen = (_req: Request, res: Response) => {
    this.service.getResumen()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getReservasPorEstado = (_req: Request, res: Response) => {
    this.service.getReservasPorEstado()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getEventosPorEstado = (_req: Request, res: Response) => {
    this.service.getEventosPorEstado()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getTopEventos = (_req: Request, res: Response) => {
    this.service.getTopEventos()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };
}