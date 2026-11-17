import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

type EstadoReserva = 'Reservada' | 'Confirmada' | 'Cancelada' | 'Asistida';

interface ReservaCliente {
  id: string;
  codigoEvento: string;
  evento: string;
  fecha: string;
  valorTotal: number;
  numeroEntradas: number;
  observaciones: string;
  estado: EstadoReserva;
}

@Component({
  selector: 'app-client-reservations',
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './client-reservations.page.html',
  styleUrl: './client-reservations.page.scss',
})
export class ClientReservationsPage implements OnInit {
  reservas: ReservaCliente[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas() {
    this.loading = true;
    this.api.getMisReservas().subscribe({
      next: (data) => {
        const lista = Array.isArray(data) ? data : data?.data || [];
        this.reservas = lista.map((r: any) => ({
          id: r.codigo,
          codigoEvento: r.evento_codigo,
          evento: r.evento_nombre,
          fecha: r.created_at
            ? new Date(r.created_at).toLocaleDateString('es-CO')
            : '',
          valorTotal: Number(r.valor_total),
          numeroEntradas: r.numero_entradas,
          observaciones: r.observaciones || '',
          estado: r.estado,
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al cargar reservas';
        this.loading = false;
      },
    });
  }

  contarPorEstado(estado: EstadoReserva): number {
    return this.reservas.filter((r) => r.estado === estado).length;
  }
}