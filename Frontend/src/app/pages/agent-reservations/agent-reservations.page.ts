import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-agent-reservations',
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './agent-reservations.page.html',
  styleUrl: './agent-reservations.page.scss',
})
export class AgentReservationsPage implements OnInit {
  reservas: any[] = [];
  loading = true;
  error = '';
  mensaje = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.loading = true;
    this.error = '';

    this.api.getReservas().subscribe({
      next: (data) => {
        const lista = Array.isArray(data) ? data : data?.data || [];
        this.reservas = lista.map((r: any) => ({
          id: r.id,
          codigo: r.codigo,
          cliente: r.cliente_nombre || '',
          evento: r.evento_nombre || '',
          codigoEvento: r.evento_codigo || '',
          entradas: r.numero_entradas,
          valorTotal: Number(r.valor_total),
          observaciones: r.observaciones || '',
          estado: r.estado,
          fecha: r.created_at
            ? new Date(r.created_at).toLocaleString('es-CO')
            : '',
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al cargar reservas';
        this.loading = false;
      },
    });
  }

  cambiarEstado(id: number, estado: string) {
    this.api.updateReserva(id, { estado }).subscribe({
      next: () => {
        this.mensaje = `Reserva actualizada a ${estado}`;
        this.cargarReservas();
      },
      error: (err) => {
        this.error = err?.error?.error || 'No se pudo actualizar';
      },
    });
  }

  eliminarReserva(id: number, codigo: string) {
    if (!confirm(`¿Eliminar la reserva ${codigo}?`)) return;

    this.api.deleteReserva(id).subscribe({
      next: () => {
        this.mensaje = `Reserva ${codigo} eliminada`;
        this.cargarReservas();
      },
      error: (err) => {
        this.error = err?.error?.error || 'No se pudo eliminar';
      },
    });
  }
}