import { Request, Response } from "express";
import { TeatroService } from "./teatro.service";
import { HandleError } from "../../../domain/errors/handle.error";

export class TeatroController {
  private readonly service = new TeatroService();

  getAll = (_req: Request, res: Response) => {
    this.service
      .getAll()
      .then((data) => res.status(200).json(data))
      .catch((error) => HandleError.error(error, res));
  };
}