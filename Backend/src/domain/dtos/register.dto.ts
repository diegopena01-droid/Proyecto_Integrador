export class RegisterDTO {
  private constructor(
    public readonly nombre: string,
    public readonly email: string,
    public readonly password: string,
    public readonly rol?: string,
    public readonly ciudad_id?: number
  ) {}

  static create(object: { [key: string]: any }): [string | undefined, RegisterDTO?] {
    const { nombre, email, password, rol, ciudad_id } = object;
    if (!nombre) return ["Missing nombre"];
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (String(password).length < 6) return ["password must be at least 6 characters"];
    return [
      undefined,
      new RegisterDTO(nombre, email, password, rol, ciudad_id != null ? Number(ciudad_id) : undefined),
    ];
  }
}