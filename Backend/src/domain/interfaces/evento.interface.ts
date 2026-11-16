export type EstadoEvento =
  | "Programado"
  | "En Boletería"
  | "En Vivo"
  | "Finalizado"
  | "Cancelado";

export interface Evento {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  teatro_id: number | null;
  ciudad_id: number | null;
  fecha_inicio: string;
  hora_inicio: string;
  hora_fin: string | null;
  capacidad: number;
  precio: number;
  estado: EstadoEvento;
  imagen_url: string | null;
  agente_id: number | null;
  created_at?: Date;
  updated_at?: Date;

  teatro?: string;
  ciudad?: string;
  agente_nombre?: string;
}

export type CreateEvento = {
  codigo: string;
  nombre: string;
  descripcion?: string | null;
  teatro_id?: number | null;
  ciudad_id?: number | null;
  fecha_inicio: string;
  hora_inicio: string;
  hora_fin?: string | null;
  capacidad: number;
  precio: number;
  estado?: EstadoEvento;
  imagen_url?: string | null;
  agente_id?: number | null;
};

export type UpdateEvento = Partial<CreateEvento>;