import { Request, Response } from "express";
import { UsuarioService } from "./usuario.service";
import { HandleError } from "../../../domain/errors/handle.error";

export class UsuarioController {
  private readonly service = new UsuarioService();

  getAllUsuarios = (_req: Request, res: Response) => {
    this.service.getAllUsuarios()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  getUsuarioById = (req: Request, res: Response) => {
    this.service.getUsuarioById(Number(req.params.id))
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  updateUsuario = (req: Request, res: Response) => {
    this.service.updateUsuario(Number(req.params.id), req.body)
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };

  deleteUsuario = (req: Request, res: Response) => {
    this.service.deleteUsuario(Number(req.params.id))
      .then((result) => res.status(200).json({ result }))
      .catch((error) => HandleError.error(error, res));
  };
}