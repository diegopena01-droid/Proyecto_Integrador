import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink , FormsModule, CommonModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.loading = true;

    this.api.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));

        const rol = res.usuario.rol;
        if (rol === 'admin') {
          this.router.navigate(['/admin']);
        } else if (rol === 'agente') {
          this.router.navigate(['/agent']);
        } else {
          this.router.navigate(['/client']);
        }

        this.loading = false;
      },
      error: (err) => {
        this.error =
          err?.error?.error ||
          err?.error?.message ||
          'Error al iniciar sesión';
        this.loading = false;
      },
    });
  }

}
