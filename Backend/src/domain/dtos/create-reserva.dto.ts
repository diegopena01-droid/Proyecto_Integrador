export class CreateReservaDTO {
  private constructor(
    public readonly evento_id: number,
    public readonly numero_entradas: number,
    public readonly observaciones?: string,
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, CreateReservaDTO?] {
    const { evento_id, numero_entradas, observaciones } = object;

    if (!evento_id) return ["Missing evento_id"];
    if (!numero_entradas) return ["Missing numero_entradas"];
    if (Number(numero_entradas) < 1) return ["numero_entradas must be greater than 0"];

    return [
      undefined,
      new CreateReservaDTO(
        Number(evento_id),
        Number(numero_entradas),
        observaciones,
      ),
    ];
  }
}