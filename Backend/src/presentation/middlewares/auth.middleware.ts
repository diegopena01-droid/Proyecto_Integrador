import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../../config/envs";
import { CustomError } from "../../domain/errors/custom.error";
import { HandleError } from "../../domain/errors/handle.error";
import { RolUsuario } from "../../domain/interfaces/usuario.interface";

export interface AuthPayload {
  id: number;
  email: string;
  rol: RolUsuario;
  nombre: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw CustomError.unauthorized("Token no proporcionado");
    }
    const token = header.split(" ")[1]!;
    const payload = jwt.verify(token, envs.JWT_SECRET) as AuthPayload;
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof CustomError) return HandleError.error(error, res);
    return HandleError.error(CustomError.unauthorized("Token inválido o expirado"), res);
  }
};

export const authorizeRoles = (...roles: RolUsuario[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw CustomError.unauthorized();
      if (!roles.includes(req.user.rol)) {
        throw CustomError.forbidden("No tiene permisos para esta acción");
      }
      next();
    } catch (error) {
      return HandleError.error(error, res);
    }
  };
};