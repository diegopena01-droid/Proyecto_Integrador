import { CurrencyPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-client-create-reservation',
  imports: [CurrencyPipe, RouterLink, FormsModule, CommonModule],
  templateUrl: './client-create-reservation.page.html',
  styleUrl: './client-create-reservation.page.scss',
})
export class ClientCreateReservationPage implements OnInit {
  evento: any = null;
  numeroEntradas = 1;
  observaciones = '';
  loading = true;
  enviando = false;
  error = '';
  mensajeExito = '';
  reservaGenerada = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const codigo = params.get('eventoId');
      if (codigo) {
        this.cargarEvento(codigo);
      } else {
        this.error = 'No se indicó el evento';
        this.loading = false;
      }
    });
  }

  cargarEvento(codigo: string) {
    this.loading = true;
    this.api.getEventoByCodigo(codigo).subscribe({
      next: (data) => {
        this.evento = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Evento no encontrado';
        this.loading = false;
      },
    });
  }

  get valorTotal(): number {
    if (!this.evento) return 0;
    return Number(this.evento.precio) * Number(this.numeroEntradas);
  }

  confirmarReserva() {
    if (!this.evento) return;

    this.enviando = true;
    this.error = '';

    this.api.createReserva({
      evento_id: this.evento.id,
      numero_entradas: Number(this.numeroEntradas),
      observaciones: this.observaciones || undefined,
    }).subscribe({
      next: (res) => {
        this.mensajeExito = `Reserva creada para ${this.evento.nombre}`;
        this.reservaGenerada = res.codigo || res.id;
        this.enviando = false;
        // Opcional: ir a mis reservas
        // this.router.navigate(['/client/reservations']);
      },
      error: (err) => {
        this.error = err?.error?.error || 'No se pudo crear la reserva';
        this.enviando = false;
      },
    });
  }
}