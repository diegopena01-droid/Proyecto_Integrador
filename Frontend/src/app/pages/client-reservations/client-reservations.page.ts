
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

type EstadoReserva = 'Reservada' | 'Confirmada' | 'Cancelada';

interface ReservaCliente {
  id: string;
  clienteId: number;
  codigoEvento: string;
  evento: string;
  fecha: string;
  hora: string;
  valorTotal: number;
  numeroEntradas: number;
  observaciones: string;
  estado: EstadoReserva;
}

@Component({
  selector: 'app-client-reservations',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './client-reservations.page.html',
  styleUrl: './client-reservations.page.scss'
})
export class ClientReservationsPage {

  // Datos ficticios para construir y probar la interfaz.
  // En la siguiente etapa los trasladaremos a un servicio.

  reservas: ReservaCliente[] = [
    {
      id: 'RES001',
      clienteId: 1,
      codigoEvento: 'EV001',
      evento: 'Concierto de Rock',
      fecha: '10/10/2026',
      hora: '10:30',
      valorTotal: 160000,
      numeroEntradas: 2,
      observaciones: 'Dos entradas para el evento.',
      estado: 'Confirmada'
    },
    {
      id: 'RES002',
      clienteId: 1,
      codigoEvento: 'EV003',
      evento: 'Obra de Teatro',
      fecha: '12/10/2026',
      hora: '15:45',
      valorTotal: 45000,
      numeroEntradas: 1,
      observaciones: 'Una entrada.',
      estado: 'Reservada'
    },
    {
      id: 'RES003',
      clienteId: 1,
      codigoEvento: 'EV005',
      evento: 'Noche de Comedia',
      fecha: '13/10/2026',
      hora: '09:15',
      valorTotal: 120000,
      numeroEntradas: 2,
      observaciones: 'Reserva de ejemplo cancelada.',
      estado: 'Cancelada'
    }
  ];

  contarPorEstado(estado: EstadoReserva): number {
    return this.reservas.filter(
      reserva => reserva.estado === estado
    ).length;
  }
}

