
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

interface EventoDisponible {
  codigo: string;
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudad: string;
  fechaInicio: string;
  horaInicio: string;
  horaFin: string;
  capacidad: number;
  precio: number;
  estado: string;
}

@Component({
  selector: 'app-client-create-reservation',
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './client-create-reservation.page.html',
  styleUrl: './client-create-reservation.page.scss'
})
export class ClientCreateReservationPage {

  eventosDisponibles: EventoDisponible[] = [
    {
      codigo: 'EV001',
      nombre: 'Concierto de Rock',
      descripcion: 'Una noche de música en vivo con grandes bandas.',
      teatro: 'Teatro Municipal',
      ciudad: 'Tuluá',
      fechaInicio: '20/11/2026',
      horaInicio: '19:00',
      horaFin: '22:00',
      capacidad: 500,
      precio: 80000,
      estado: 'Programado'
    },
    {
      codigo: 'EV002',
      nombre: 'Festival de Música',
      descripcion: 'Una jornada llena de música y artistas.',
      teatro: 'Coliseo Central',
      ciudad: 'Cali',
      fechaInicio: '25/11/2026',
      horaInicio: '16:00',
      horaFin: '23:00',
      capacidad: 1200,
      precio: 120000,
      estado: 'Programado'
    },
    {
      codigo: 'EV003',
      nombre: 'Obra de Teatro',
      descripcion: 'Una presentación teatral para disfrutar en familia.',
      teatro: 'Teatro Principal',
      ciudad: 'Buga',
      fechaInicio: '28/11/2026',
      horaInicio: '18:00',
      horaFin: '20:00',
      capacidad: 300,
      precio: 45000,
      estado: 'Programado'
    },
    {
      codigo: 'EV005',
      nombre: 'Noche de Comedia',
      descripcion: 'Una noche de humor con invitados especiales.',
      teatro: 'Teatro Municipal',
      ciudad: 'Cali',
      fechaInicio: '10/12/2026',
      horaInicio: '20:00',
      horaFin: '22:00',
      capacidad: 400,
      precio: 60000,
      estado: 'Programado'
    }
  ];

  eventoSeleccionadoId = '';
  nombreCliente = '';
  numeroEntradas = 1;
  observaciones = '';

  mensajeExito = '';
  reservaGenerada = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      const eventoId = params.get('eventoId');

      if (eventoId) {
        this.eventoSeleccionadoId = eventoId;
        this.actualizarEvento();
      }
    });
  }

  get eventoSeleccionado(): EventoDisponible | undefined {
    return this.eventosDisponibles.find(
      evento => evento.codigo === this.eventoSeleccionadoId
    );
  }

  get valorTotal(): number {
    return (this.eventoSeleccionado?.precio ?? 0)
      * this.numeroEntradasValido;
  }

  get cantidadValida(): boolean {
    const evento = this.eventoSeleccionado;

    return !!evento
      && evento.estado === 'Programado'
      && Number.isInteger(Number(this.numeroEntradas))
      && Number(this.numeroEntradas) >= 1
      && Number(this.numeroEntradas) <= evento.capacidad;
  }

  private get numeroEntradasValido(): number {
    const cantidad = Number(this.numeroEntradas);

    return Number.isInteger(cantidad) && cantidad > 0
      ? cantidad
      : 0;
  }

  actualizarEvento(): void {
    this.mensajeExito = '';
    this.reservaGenerada = '';
  }

  crearReserva(form: NgForm): void {
    if (form.invalid || !this.cantidadValida || !this.eventoSeleccionado) {
      return;
    }

    const reserva = {
      id: `RES-${Date.now()}`,
      cliente: this.nombreCliente.trim(),
      eventoId: this.eventoSeleccionado.codigo,
      fechaHora: new Date().toLocaleString('es-CO'),
      valorTotal: this.valorTotal,
      numeroEntradas: Number(this.numeroEntradas),
      observaciones: this.observaciones.trim(),
      estado: 'Reservada'
    };

    this.reservaGenerada = reserva.id;
    this.mensajeExito =
      `Se preparó la reserva para ${this.eventoSeleccionado.nombre} por `
      + `${this.valorTotal.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      })}.`;

    // Por ahora solo mostramos la confirmación en pantalla.
    // En la siguiente etapa guardaremos la reserva mediante un servicio.
  }

  limpiarFormulario(form: NgForm): void {
    this.eventoSeleccionadoId = '';
    this.nombreCliente = '';
    this.numeroEntradas = 1;
    this.observaciones = '';
    this.mensajeExito = '';
    this.reservaGenerada = '';

    form.resetForm({
      evento: '',
      cliente: '',
      entradas: 1,
      observaciones: ''
    });
  }
}

