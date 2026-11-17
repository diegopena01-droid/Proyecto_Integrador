import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-agent-create-event',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './agent-create-event.page.html',
  styleUrl: './agent-create-event.page.scss',
})
export class AgentCreateEventPage implements OnInit {
  codigo = '';
  nombre = '';
  descripcion = '';
  fechaInicio = '';
  horaInicio = '';
  horaFin = '';
  capacidad = 100;
  precio = 0;
  estado = 'Programado';
  imagenUrl = '';

  ciudadId: number | null = null;
  teatroId: number | null = null;

  ciudades: any[] = [];
  teatros: any[] = [];
  teatrosFiltrados: any[] = [];

  error = '';
  mensaje = '';
  enviando = false;

  estados = ['Programado', 'En Boletería', 'En Vivo', 'Finalizado', 'Cancelado'];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarCiudades();
    this.cargarTeatros();
  }

  cargarCiudades() {
    this.api.getCiudades().subscribe({
      next: (data) => {
        this.ciudades = Array.isArray(data) ? data : data?.data || [];
      },
      error: () => {
        this.error = 'No se pudieron cargar las ciudades';
      },
    });
  }

  cargarTeatros() {
    this.api.getTeatros().subscribe({
      next: (data) => {
        this.teatros = Array.isArray(data) ? data : data?.data || [];
        this.filtrarTeatros();
      },
      error: () => {
        this.teatros = [];
      },
    });
  }

  onCiudadChange() {
    this.teatroId = null;
    this.filtrarTeatros();
  }

  filtrarTeatros() {
    if (!this.ciudadId) {
      this.teatrosFiltrados = this.teatros;
      return;
    }
    this.teatrosFiltrados = this.teatros.filter(
      (t) => Number(t.ciudad_id) === Number(this.ciudadId)
    );
  }

  onSubmit() {
    this.error = '';
    this.mensaje = '';

    if (!this.ciudadId) {
      this.error = 'Selecciona una ciudad';
      return;
    }

    this.enviando = true;

    let fecha = this.fechaInicio;
    let hora = this.horaInicio;

    if (this.fechaInicio && this.fechaInicio.includes('T')) {
      const partes = this.fechaInicio.split('T');
      fecha = partes[0];
      hora = partes[1]?.substring(0, 5) || this.horaInicio;
    }

    const body: any = {
      codigo: this.codigo.trim(),
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim() || undefined,
      fecha_inicio: fecha,
      hora_inicio: hora || '19:00',
      hora_fin: this.horaFin || undefined,
      capacidad: Number(this.capacidad),
      precio: Number(this.precio),
      estado: this.estado,
      imagen_url: this.imagenUrl.trim() || undefined,
      ciudad_id: Number(this.ciudadId),
    };

    if (this.teatroId) {
      body.teatro_id = Number(this.teatroId);
    }

    this.api.createEvento(body).subscribe({
      next: (res) => {
        this.mensaje = `Evento ${res.codigo || this.codigo} creado correctamente`;
        this.enviando = false;
      },
      error: (err) => {
        this.error =
          err?.error?.error ||
          err?.error?.message ||
          'No se pudo crear el evento';
        this.enviando = false;
      },
    });
  }
}