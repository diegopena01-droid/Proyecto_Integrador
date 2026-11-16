import { Request, Response } from "express";
import { EventoService } from "./evento.service";
import { HandleError } from "../../../domain/errors/handle.error";
import { CreateEventoDTO } from "../../../domain/dtos/create-evento.dto";
import { UpdateEventoDTO } from "../../../domain/dtos/update-evento.dto";

export class EventoController {
  private readonly service = new EventoService();

  getAllEventos = (_req: Request, res: Response) => {
    this.service.getAllEventos()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getEventoById = (req: Request, res: Response) => {
    this.service.getEventoById(Number(req.params.id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getEventoByCodigo = (req: Request, res: Response) => {
    this.service.getEventoByCodigo(String(req.params.codigo))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  createEvento = (req: Request, res: Response) => {
    const [error, dto] = CreateEventoDTO.create({
      ...req.body,
      agente_id: req.user?.id,
    });
    if (error) return res.status(400).json({ error });
    this.service.createEvento(dto! as any)
      .then((data) => res.status(201).json(data))
      .catch((err) => HandleError.error(err, res));
  };

  updateEvento = (req: Request, res: Response) => {
    const [error, dto] = UpdateEventoDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    this.service.updateEvento(Number(req.params.id), dto! as any)
      .then((data) => res.status(200).json(data))
      .catch((err) => HandleError.error(err, res));
  };

  deleteEvento = (req: Request, res: Response) => {
    this.service.deleteEvento(Number(req.params.id))
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };
}