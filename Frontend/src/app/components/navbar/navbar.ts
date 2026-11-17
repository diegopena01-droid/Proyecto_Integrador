import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  nombre = '';
  rol = '';
  homeLink = '/login';

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarUsuario();

    // Si cambia de ruta (login → client, etc.), vuelve a leer el usuario
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.cargarUsuario());
  }

  cargarUsuario() {
    const raw = localStorage.getItem('usuario');
    if (!raw) {
      this.nombre = '';
      this.rol = '';
      this.homeLink = '/login';
      return;
    }

    try {
      const usuario = JSON.parse(raw);
      this.nombre = usuario.nombre || usuario.email || 'Usuario';
      this.rol = usuario.rol || '';

      if (this.rol === 'admin') this.homeLink = '/admin';
      else if (this.rol === 'agente') this.homeLink = '/agent';
      else if (this.rol === 'cliente') this.homeLink = '/client';
      else this.homeLink = '/login';
    } catch {
      this.nombre = '';
      this.rol = '';
      this.homeLink = '/login';
    }
  }

  get rolTexto(): string {
    if (this.rol === 'admin') return 'Admin';
    if (this.rol === 'agente') return 'Agente';
    if (this.rol === 'cliente') return 'Cliente';
    return '';
  }

  get estaLogueado(): boolean {
    return !!this.nombre && !!this.rol;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.nombre = '';
    this.rol = '';
    this.homeLink = '/login';
    this.router.navigate(['/login']);
  }
}