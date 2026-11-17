import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface EventoDisponible {
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
  precio: number;
  estado: string;
}

@Component({
  selector: 'app-client-create-reservation',
  imports: [CurrencyPipe, RouterLink, FormsModule, CommonModule],
  templateUrl: './client-create-reservation.page.html',
  styleUrl: './client-create-reservation.page.scss',
})
export class ClientCreateReservationPage implements OnInit {
  eventosDisponibles: EventoDisponible[] = [];
  eventoSeleccionadoId = '';
  nombreCliente = '';
  numeroEntradas = 1;
  observaciones = '';

  mensajeExito = '';
  reservaGenerada = '';
  error = '';
  loading = true;
  enviando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    // Cargar lista de eventos desde la API
    this.api.getEventos().subscribe({
      next: (data) => {
        const lista = Array.isArray(data) ? data : data?.data || [];
        this.eventosDisponibles = lista
          .filter((e: any) => e.estado === 'Programado' || e.estado === 'En Boletería')
          .map((e: any) => ({
            id: e.id,
            codigo: e.codigo,
            nombre: e.nombre,
            descripcion: e.descripcion || '',
            teatro: e.teatro || 'Sin teatro',
            ciudad: e.ciudad || 'Sin ciudad',
            fechaInicio: e.fecha_inicio,
            horaInicio: String(e.hora_inicio || '').substring(0, 5),
            horaFin: String(e.hora_fin || '').substring(0, 5),
            capacidad: e.capacidad,
            precio: Number(e.precio),
            estado: e.estado,
          }));

        // Si viene el código por la ruta, seleccionarlo
        this.route.paramMap.subscribe((params) => {
          const eventoId = params.get('eventoId');
          if (eventoId) {
            this.eventoSeleccionadoId = eventoId;
            this.actualizarEvento();
          }
          this.loading = false;
        });
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al cargar eventos';
        this.loading = false;
      },
    });
  }

  get eventoSeleccionado(): EventoDisponible | undefined {
    return this.eventosDisponibles.find(
      (evento) => evento.codigo === this.eventoSeleccionadoId
    );
  }

  get valorTotal(): number {
    return (this.eventoSeleccionado?.precio ?? 0) * this.numeroEntradasValido;
  }

  get cantidadValida(): boolean {
    const evento = this.eventoSeleccionado;
    return (
      !!evento &&
      (evento.estado === 'Programado' || evento.estado === 'En Boletería') &&
      Number.isInteger(Number(this.numeroEntradas)) &&
      Number(this.numeroEntradas) >= 1 &&
      Number(this.numeroEntradas) <= evento.capacidad
    );
  }

  private get numeroEntradasValido(): number {
    const cantidad = Number(this.numeroEntradas);
    return Number.isInteger(cantidad) && cantidad > 0 ? cantidad : 0;
  }

  actualizarEvento(): void {
    this.mensajeExito = '';
    this.reservaGenerada = '';
    this.error = '';
  }

  crearReserva(form: NgForm): void {
    if (form.invalid || !this.cantidadValida || !this.eventoSeleccionado) {
      return;
    }

    this.enviando = true;
    this.error = '';
    this.mensajeExito = '';

    this.api
      .createReserva({
        evento_id: this.eventoSeleccionado.id,
        numero_entradas: Number(this.numeroEntradas),
        observaciones: this.observaciones.trim() || undefined,
      })
      .subscribe({
        next: (res) => {
          this.reservaGenerada = res.codigo || String(res.id);
          this.mensajeExito =
            `Se creó la reserva para ${this.eventoSeleccionado!.nombre} por ` +
            `${this.valorTotal.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP',
              maximumFractionDigits: 0,
            })}.`;
          this.enviando = false;
        },
        error: (err) => {
          this.error =
            err?.error?.error ||
            err?.error?.message ||
            'No se pudo crear la reserva';
          this.enviando = false;
        },
      });
  }

  limpiarFormulario(form: NgForm): void {
    this.eventoSeleccionadoId = '';
    this.nombreCliente = '';
    this.numeroEntradas = 1;
    this.observaciones = '';
    this.mensajeExito = '';
    this.reservaGenerada = '';
    this.error = '';

    form.resetForm({
      evento: '',
      cliente: '',
      entradas: 1,
      observaciones: '',
    });
  }
}