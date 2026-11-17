import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-agent-events',
  imports: [RouterLink, CommonModule, CurrencyPipe],
  templateUrl: './agent-events.page.html',
  styleUrl: './agent-events.page.scss',
})
export class AgentEventsPage implements OnInit {
  eventos: any[] = [];
  loading = true;
  error = '';
  mensaje = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.loading = true;
    this.error = '';

    this.api.getEventos().subscribe({
      next: (data) => {
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
          precio: Number(e.precio),
          precioTexto: this.formatearPrecio(e.precio),
          estado: e.estado,
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al cargar eventos';
        this.loading = false;
      },
    });
  }

  eliminarEvento(id: number, codigo: string) {
    if (!confirm(`¿Eliminar el evento ${codigo}?`)) return;

    this.api.deleteEvento(id).subscribe({
      next: () => {
        this.mensaje = `Evento ${codigo} eliminado`;
        this.cargarEventos();
      },
      error: (err) => {
        this.error = err?.error?.error || 'No se pudo eliminar';
      },
    });
  }

  private formatearFecha(fecha: string): string {
    if (!fecha) return '';
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