export class UpdateEventoDTO {
  private constructor(
    public readonly codigo?: string,
    public readonly nombre?: string,
    public readonly descripcion?: string,
    public readonly teatro_id?: number,
    public readonly ciudad_id?: number,
    public readonly fecha_inicio?: string,
    public readonly hora_inicio?: string,
    public readonly hora_fin?: string,
    public readonly capacidad?: number,
    public readonly precio?: number,
    public readonly estado?: string,
    public readonly imagen_url?: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, UpdateEventoDTO?] {
    const {
      codigo, nombre, descripcion, teatro_id, ciudad_id,
      fecha_inicio, hora_inicio, hora_fin, capacidad, precio, estado, imagen_url,
    } = object;

    if (codigo != null && String(codigo).length > 20) return ["codigo is too large"];
    if (nombre != null && String(nombre).length > 200) return ["nombre is too large"];
    if (capacidad != null && Number(capacidad) < 1) return ["capacidad must be greater than 0"];
    if (precio != null && Number(precio) < 0) return ["precio must be >= 0"];

    return [
      undefined,
      new UpdateEventoDTO(
        codigo, nombre, descripcion,
        teatro_id != null ? Number(teatro_id) : undefined,
        ciudad_id != null ? Number(ciudad_id) : undefined,
        fecha_inicio, hora_inicio, hora_fin,
        capacidad != null ? Number(capacidad) : undefined,
        precio != null ? Number(precio) : undefined,
        estado, imagen_url,
      ),
    ];
  }
}