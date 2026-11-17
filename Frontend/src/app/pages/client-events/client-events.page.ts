import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

type EstadoEvento =
  | 'Programado'
  | 'En Boletería'
  | 'En Vivo'
  | 'Finalizado'
  | 'Cancelado';

interface EventoVista {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudad: string;
  fechaInicio: string;
  horaInicio: string;
  horaFin: string;
  capacidad: number;
  precioTexto: string;
  estado: EstadoEvento;
  imagen: string;
}

@Component({
  selector: 'app-client-events',
  imports: [RouterLink, CommonModule],
  templateUrl: './client-events.page.html',
  styleUrl: './client-events.page.scss',
})
export class ClientEventsPage implements OnInit {
  eventos: EventoVista[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.loading = true;
    this.error = '';

    this.api.getEventos().subscribe({
      next: (data) => {
        // El backend del lab devuelve el array directo
        const lista = Array.isArray(data) ? data : data?.data || [];

        this.eventos = lista.map((e: any) => ({
          id: e.id,
          codigo: e.codigo,
          nombre: e.nombre,
          descripcion: e.descripcion || '',
          teatro: e.teatro || 'Sin teatro',
          ciudad: e.ciudad || 'Sin ciudad',
          fechaInicio: this.formatearFecha(e.fecha_inicio),
          horaInicio: String(e.hora_inicio || '').substring(0, 5),
          horaFin: String(e.hora_fin || '').substring(0, 5),
          capacidad: e.capacidad,
          precioTexto: this.formatearPrecio(e.precio),
          estado: e.estado,
          imagen: e.imagen_url || 'https://via.placeholder.com/400x200',
        }));

        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al cargar eventos';
        this.loading = false;
      },
    });
  }

  private formatearFecha(fecha: string): string {
    if (!fecha) return '';
    // Si viene "2026-11-20" o ISO
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return fecha;
    return d.toLocaleDateString('es-CO');
  }

  private formatearPrecio(precio: number | string): string {
    const n = Number(precio) || 0;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(n);
  }
}