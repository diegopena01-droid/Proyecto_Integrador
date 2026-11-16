export class CreateEventoDTO {
  private constructor(
    public readonly codigo: string,
    public readonly nombre: string,
    public readonly fecha_inicio: string,
    public readonly hora_inicio: string,
    public readonly capacidad: number,
    public readonly precio: number,
    public readonly descripcion?: string,
    public readonly teatro_id?: number,
    public readonly ciudad_id?: number,
    public readonly hora_fin?: string,
    public readonly estado?: string,
    public readonly imagen_url?: string,
    public readonly agente_id?: number,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateEventoDTO?] {
    const {
      codigo, nombre, fecha_inicio, hora_inicio, capacidad, precio,
      descripcion, teatro_id, ciudad_id, hora_fin, estado, imagen_url, agente_id,
    } = object;

    if (!codigo) return ["Missing codigo"];
    if (!nombre) return ["Missing nombre"];
    if (!fecha_inicio) return ["Missing fecha_inicio"];
    if (!hora_inicio) return ["Missing hora_inicio"];
    if (capacidad == null) return ["Missing capacidad"];
    if (precio == null) return ["Missing precio"];

    if (String(codigo).length > 20) return ["codigo is too large, max 20 characters"];
    if (String(nombre).length > 200) return ["nombre is too large, max 200 characters"];
    if (Number(capacidad) < 1) return ["capacidad must be greater than 0"];
    if (Number(precio) < 0) return ["precio must be >= 0"];

    return [
      undefined,
      new CreateEventoDTO(
        codigo, nombre, fecha_inicio, hora_inicio,
        Number(capacidad), Number(precio),
        descripcion, teatro_id ? Number(teatro_id) : undefined,
        ciudad_id ? Number(ciudad_id) : undefined,
        hora_fin, estado, imagen_url,
        agente_id ? Number(agente_id) : undefined,
      ),
    ];
  }
}