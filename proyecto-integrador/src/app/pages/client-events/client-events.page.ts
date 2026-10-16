
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type EstadoEvento =
  | 'Programado'
  | 'En Boletería'
  | 'En Vivo'
  | 'Finalizado'
  | 'Cancelado';

interface EventoVista {
  codigo: string;
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudad: string;
  fechaInicio: string;
  horaInicio: string;
  horaFin: string;
  capacidad: number;
  precioTexto: string;
  estado: EstadoEvento;
  imagen: string;
}

@Component({
  selector: 'app-client-events',
  imports: [RouterLink],
  templateUrl: './client-events.page.html',
  styleUrl: './client-events.page.scss'
})
export class ClientEventsPage {

  eventos: EventoVista[] = [
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
      precioTexto: '$80.000 COP',
      estado: 'Programado',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrMLiXncPC_faDwaHx5GP1D3QYeP-SxRSmqvwigFf_aA&s=10'
    },
    {
      codigo: 'EV002',
      nombre: 'Festival de Música',
      descripcion: 'Disfruta una jornada llena de música y artistas.',
      teatro: 'Coliseo Central',
      ciudad: 'Cali',
      fechaInicio: '25/11/2026',
      horaInicio: '16:00',
      horaFin: '23:00',
      capacidad: 1200,
      precioTexto: '$120.000 COP',
      estado: 'Programado',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVwCzKfOWxF4n3SNuNbimUY8x-NnGW58h6H5nvaABL5w&s=10'
      
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
      precioTexto: '$45.000 COP',
      estado: 'Programado',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWG4va_dysPAIyvWmlki4Jl7gvPWtV64KIs23Wp5vEaQ&s=10'
    },
    {
      codigo: 'EV004',
      nombre: 'Festival Cultural',
      descripcion: 'Una celebración de arte, cultura y tradición.',
      teatro: 'Centro de Eventos',
      ciudad: 'Tuluá',
      fechaInicio: '05/12/2026',
      horaInicio: '14:00',
      horaFin: '21:00',
      capacidad: 800,
      precioTexto: '$35.000 COP',
      estado: 'En Boletería',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoNbU791LsjYgcJwmE_qOtbX2RiLhcbwqY91quutAjbw&s=10'
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
      precioTexto: '$60.000 COP',
      estado: 'Programado',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5oYyjpzqaoXGLg0BYl2tRJG2328Pf3gGQt3w9Jr8iA&s=10'
    },
    {
      codigo: 'EV006',
      nombre: 'Concierto Acústico',
      descripcion: 'Una experiencia musical en un formato íntimo.',
      teatro: 'Auditorio Central',
      ciudad: 'Buga',
      fechaInicio: '15/12/2026',
      horaInicio: '19:00',
      horaFin: '21:00',
      capacidad: 250,
      precioTexto: '$55.000 COP',
      estado: 'Cancelado',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3a9xZTydX0OoPeHSW8LrwwjS8WcLpje_Aa_IkzJEvHA&s=10'
    }
  ];
}
