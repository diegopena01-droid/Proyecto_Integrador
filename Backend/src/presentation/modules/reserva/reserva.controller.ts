import { Request, Response } from "express";
import { ReservaService } from "./reserva.service";
import { HandleError } from "../../../domain/errors/handle.error";
import { CreateReservaDTO } from "../../../domain/dtos/create-reserva.dto";
import { CustomError } from "../../../domain/errors/custom.error";

export class ReservaController {
  private readonly service = new ReservaService();

  getAllReservas = (_req: Request, res: Response) => {
    this.service.getAllReservas()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getReservaById = (req: Request, res: Response) => {
    this.service.getReservaById(Number(req.params.id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getMisReservas = (req: Request, res: Response) => {
    if (!req.user) return HandleError.error(CustomError.unauthorized(), res);
    this.service.getReservasByUsuario(req.user.id)
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  createReserva = (req: Request, res: Response) => {
    if (!req.user) return HandleError.error(CustomError.unauthorized(), res);
    const [error, dto] = CreateReservaDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    this.service.createReserva({
      usuario_id: req.user.id,
      evento_id: dto!.evento_id,
      numero_entradas: dto!.numero_entradas,
      observaciones: dto!.observaciones,
    })
      .then((data) => res.status(201).json(data))
      .catch((err) => HandleError.error(err, res));
  };

  updateReserva = (req: Request, res: Response) => {
    this.service.updateReserva(Number(req.params.id), req.body)
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  deleteReserva = (req: Request, res: Response) => {
    this.service.deleteReserva(Number(req.params.id))
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };
}