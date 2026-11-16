export type RolUsuario = "cliente" | "agente" | "admin";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  rol: RolUsuario;
  ciudad_id: number | null;
  activo: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type UpdateUsuario = Partial<{
  nombre: string;
  email: string;
  rol: RolUsuario;
  ciudad_id: number | null;
  activo: boolean;
}>;