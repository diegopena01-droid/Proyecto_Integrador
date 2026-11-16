export type EstadoReserva = "Reservada" | "Confirmada" | "Cancelada" | "Asistida";

export interface Reserva {
  id: number;
  codigo: string;
  usuario_id: number;
  evento_id: number;
  numero_entradas: number;
  valor_total: number;
  observaciones: string | null;
  estado: EstadoReserva;
  created_at?: Date;
  updated_at?: Date;

  // Campos de JOINs
  cliente_nombre?: string;
  evento_nombre?: string;
  evento_codigo?: string;
}

export type CreateReserva = {
  usuario_id: number;
  evento_id: number;
  numero_entradas: number;
  observaciones?: string;
};

export type UpdateReserva = Partial<{
  numero_entradas: number;
  observaciones: string;
  estado: EstadoReserva;
}>;