export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  static unauthorized(message: string = "No autorizado") {
    return new CustomError(401, message);
  }

  static forbidden(message: string = "Acceso denegado") {
    return new CustomError(403, message);
  }

  static notFound(message: string = "Recurso no encontrado") {
    return new CustomError(404, message);
  }

  static internalServer(message: string = "Error interno del servidor") {
    return new CustomError(500, message);
  }
}