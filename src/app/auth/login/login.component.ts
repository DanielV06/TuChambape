import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importa Router
import { AuthService, UserCredentials } from '../services/auth.service'; // Importa el servicio y la interfaz

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Objeto para almacenar los datos del formulario de login
  loginData: UserCredentials = {
    email: '',
    password: ''
  };

  // Propiedades para los mensajes de error y éxito
  emailError: string | null = null;
  passwordError: string | null = null;
  generalError: string | null = null;
  successMessage: string | null = null;

  isLoading: boolean = false; // Para mostrar un indicador de carga

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    // Resetear errores y mensajes previos
    this.emailError = null;
    this.passwordError = null;
    this.generalError = null;
    this.successMessage = null;
    this.isLoading = true;

    let isValidFrontend = true;

    // Validación de campos obligatorios
    if (!this.loginData.email) {
      this.emailError = '¡El correo es obligatorio!';
      isValidFrontend = false;
    }
    if (!this.loginData.password) {

      this.passwordError = '¡La contraseña es obligatoria!';

      isValidFrontend = false;
    }

    // Validación de formato de email
    if (this.loginData.email && !this.isValidEmail(this.loginData.email)) {
      this.emailError = 'Formato de e-mail incorrecto.';
      isValidFrontend = false;
    }

    if (!isValidFrontend) {
      this.isLoading = false;
      console.log('Formulario de login inválido (frontend).');
      return; // Detiene la ejecución si la validación frontend falla
    }

    // Si las validaciones del frontend pasan, llamar al servicio
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.user) {
          this.successMessage = `¡Bienvenido, ${response.user.email}! Redirigiendo...`;
          console.log('Usuario autenticado:', response.user);

          // Limpiar formulario y errores para que no se muestren brevemente antes de redirigir
          this.loginData = { email: '', password: '' };
          this.generalError = null;
          this.emailError = null;
          this.passwordError = null;

          // Redirección automática:
          setTimeout(() => {
            this.router.navigate(['/client/inicio']); // Redirige a la página de inicio del cliente
          }, 1000); // Retraso de 1 segundo

        } else {
          this.generalError = response.message || 'Error desconocido al iniciar sesión.';
          // Si el mensaje del servicio indica "contraseña incorrecta", lo asignamos a passwordError

          if (response.message && response.message.toLowerCase().includes('contraseña incorrecta')) {
            this.passwordError = response.message;
            this.generalError = null; // Limpiamos el error general
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en el servicio de login:', err);
        this.generalError = 'Error de conexión o del servidor. Intente más tarde.';
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
