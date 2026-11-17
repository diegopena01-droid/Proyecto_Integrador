import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, { email, password });
  }

  register(data: {
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    ciudad_id?: number;
  }): Observable<any> {
    return this.http.post(`${API_URL}/auth/register`, data);
  }

  
  getEventos(): Observable<any> {
    return this.http.get(`${API_URL}/eventos`, { headers: this.headers() });
  }

  getEventoByCodigo(codigo: string): Observable<any> {
    return this.http.get(`${API_URL}/eventos/codigo/${codigo}`, {
      headers: this.headers(),
    });
  }

  createEvento(data: any): Observable<any> {
    return this.http.post(`${API_URL}/eventos`, data, {
      headers: this.headers(),
    });
  }

  updateEvento(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/eventos/${id}`, data, {
      headers: this.headers(),
    });
  }

  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/eventos/${id}`, {
      headers: this.headers(),
    });
  }

 
  getMisReservas(): Observable<any> {
    return this.http.get(`${API_URL}/reservas/mis-reservas`, {
      headers: this.headers(),
    });
  }

  getReservas(): Observable<any> {
    return this.http.get(`${API_URL}/reservas`, {
      headers: this.headers(),
    });
  }

  createReserva(data: {
    evento_id: number;
    numero_entradas: number;
    observaciones?: string;
  }): Observable<any> {
    return this.http.post(`${API_URL}/reservas`, data, {
      headers: this.headers(),
    });
  }

  updateReserva(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/reservas/${id}`, data, {
      headers: this.headers(),
    });
  }

  deleteReserva(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/reservas/${id}`, {
      headers: this.headers(),
    });
  }

  
  getResumen(): Observable<any> {
    return this.http.get(`${API_URL}/reportes/resumen`, {
      headers: this.headers(),
    });
  }

  getTopEventos(): Observable<any> {
    return this.http.get(`${API_URL}/reportes/top-eventos`, {
      headers: this.headers(),
    });
  }

  getReservasPorEstado(): Observable<any> {
    return this.http.get(`${API_URL}/reportes/reservas-por-estado`, {
      headers: this.headers(),
    });
  }

  getEventosPorEstado(): Observable<any> {
    return this.http.get(`${API_URL}/reportes/eventos-por-estado`, {
      headers: this.headers(),
    });
  }
}