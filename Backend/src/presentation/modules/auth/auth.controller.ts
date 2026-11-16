import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { HandleError } from "../../../domain/errors/handle.error";
import { LoginDTO } from "../../../domain/dtos/login.dto";
import { RegisterDTO } from "../../../domain/dtos/register.dto";

export class AuthController {
  private readonly authService = new AuthService();

  login = (req: Request, res: Response) => {
    const [error, dto] = LoginDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    this.authService.login(dto!.email, dto!.password)
      .then((data) => res.status(200).json(data))
      .catch((err) => HandleError.error(err, res));
  };

  register = (req: Request, res: Response) => {
    const [error, dto] = RegisterDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    this.authService.register(dto!)
      .then((data) => res.status(201).json(data))
      .catch((err) => HandleError.error(err, res));
  };
}