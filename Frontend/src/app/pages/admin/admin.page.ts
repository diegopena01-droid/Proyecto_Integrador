import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.scss',
})
export class AdminPage implements OnInit {
  resumen = {
    total_eventos: 0,
    total_reservas: 0,
    total_clientes: 0,
    reservas_canceladas: 0,
  };

  topEventos: any[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
    this.error = '';

    this.api.getResumen().subscribe({
      next: (data) => {
        this.resumen = {
          total_eventos: data.total_eventos ?? 0,
          total_reservas: data.total_reservas ?? 0,
          total_clientes: data.total_clientes ?? 0,
          reservas_canceladas: data.reservas_canceladas ?? 0,
        };
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al cargar resumen';
        this.loading = false;
      },
    });

    this.api.getTopEventos().subscribe({
      next: (data) => {
        this.topEventos = Array.isArray(data) ? data : data?.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Error al cargar top eventos';
        this.loading = false;
      },
    });
  }
}