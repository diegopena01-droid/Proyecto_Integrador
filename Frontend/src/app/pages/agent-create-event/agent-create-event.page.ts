import { Component } from '@angular/core';
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
export class AgentCreateEventPage {
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

  error = '';
  mensaje = '';
  enviando = false;

  estados = ['Programado', 'En Boletería', 'En Vivo', 'Finalizado', 'Cancelado'];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.mensaje = '';
    this.enviando = true;

    // Si usas datetime-local, puedes separar fecha y hora
    let fecha = this.fechaInicio;
    let hora = this.horaInicio;

    if (this.fechaInicio && this.fechaInicio.includes('T')) {
      const partes = this.fechaInicio.split('T');
      fecha = partes[0];
      hora = partes[1]?.substring(0, 5) || this.horaInicio;
    }

    const body = {
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
    };

    this.api.createEvento(body).subscribe({
      next: (res) => {
        this.mensaje = `Evento ${res.codigo || this.codigo} creado correctamente`;
        this.enviando = false;
        // Opcional: ir a la lista
        // this.router.navigate(['/agent/events']);
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
