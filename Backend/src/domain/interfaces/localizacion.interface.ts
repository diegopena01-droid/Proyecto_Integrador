export interface Pais {
  id: number;
  nombre: string;
  codigo: string;
}

export interface Departamento {
  id: number;
  nombre: string;
  pais_id: number;
  pais_nombre?: string;
}

export interface Ciudad {
  id: number;
  nombre: string;
  departamento_id: number;
  departamento_nombre?: string;
  pais_nombre?: string;
}