import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map as rxjsMap } from 'rxjs/operators';

// Interfaz para definir la estructura de las credenciales de un usuario
export interface UserCredentials {
  email: string;
  password: string; // La contraseña en texto plano
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Array para el almacenamiento de usuarios en el frontend
  private registeredUsers: UserCredentials[] = [];

  // Propiedades para el flujo de reseteo de contraseña
  private emailForReset: string | null = null;
  private resetCode: string | null = null;
  private resetCodeExpires: number | null = null;
  private isCodeVerifiedForReset: boolean = false;

  // Propiedad para simular el usuario actualmente logueado
  private currentUserEmail: string | null = null;

  constructor() {

  }

  // --- Métodos de Autenticación Principal ---

  register(userData: UserCredentials): Observable<{ success: boolean, message?: string }> {
    return of(null).pipe(
      delay(500), // Simular retraso de red
      rxjsMap(() => {
        const userExists = this.registeredUsers.find(user => user.email === userData.email);
        if (userExists) {
          return { success: false, message: 'Este correo electrónico ya está registrado.' };
        }
        this.registeredUsers.push({ ...userData });

        console.log('AUTH_SERVICE: Usuarios registrados (simulado):', this.registeredUsers);
        return { success: true, message: '¡Registro exitoso!' };
      })
    );
  }

  login(credentials: UserCredentials): Observable<{ success: boolean, message?: string, user?: { email: string } }> {
    return of(null).pipe(
      delay(500), // Simular retraso de red
      rxjsMap(() => {
        const user = this.registeredUsers.find(u => u.email === credentials.email);
        if (!user) {
          return { success: false, message: 'Correo electrónico no registrado.' };
        }
        if (user.password !== credentials.password) {
          return { success: false, message: 'Contraseña incorrecta. Intente nuevamente.' };
        }
        console.log('AUTH_SERVICE: Login exitoso para:', user.email);
        this.setCurrentUser(user.email); // Establece el usuario actual logueado
        return { success: true, message: 'Inicio de sesión exitoso.', user: { email: user.email } };
      })
    );
  }

  // --- Métodos de Sesión (para el AuthGuard) ---

  private setCurrentUser(email: string): void {
    this.currentUserEmail = email;

    console.log('AUTH_SERVICE: Usuario actual establecido:', this.currentUserEmail);
  }

  clearCurrentUser(): void {
    this.currentUserEmail = null;

    console.log('AUTH_SERVICE: Sesión de usuario cerrada.');
  }

  isLoggedIn(): boolean {
    return !!this.currentUserEmail; // Devuelve true si currentUserEmail tiene un valor (está logueado)
  }

  getCurrentUserEmail(): string | null {
    return this.currentUserEmail;
  }

  // --- Métodos para Recuperación de Contraseña ---

  doesUserExist(email: string): boolean {
    return this.registeredUsers.some(user => user.email === email);
  }

  requestPasswordReset(email: string): Observable<{ success: boolean, message?: string }> {
    this.emailForReset = null;
    this.resetCode = null;
    this.resetCodeExpires = null;
    this.isCodeVerifiedForReset = false;

    return of(null).pipe(
      delay(500),
      rxjsMap(() => {
        if (this.doesUserExist(email)) {
          this.emailForReset = email;
          this.resetCode = Math.floor(1000 + Math.random() * 9000).toString(); // Código de 4 dígitos
          this.resetCodeExpires = Date.now() + (10 * 60 * 1000); // Expira en 10 minutos
          console.log(`AUTH_SERVICE: Código de reseteo para ${this.emailForReset}: ${this.resetCode} (expira en ${new Date(this.resetCodeExpires).toLocaleTimeString()})`);
          return { success: true, message: 'Si tu correo está registrado, recibirás un código de verificación.' };
        } else {
          return { success: true, message: 'Si tu correo está registrado, recibirás un código de verificación.' };
        }
      })
    );
  }

  getEmailForPasswordReset(): string | null {
    return this.emailForReset;
  }

  verifyResetCode(email: string, code: string): Observable<{ success: boolean, message?: string }> {
    this.isCodeVerifiedForReset = false;

    return of(null).pipe(
      delay(500),
      rxjsMap(() => {
        if (this.emailForReset !== email) {
          return { success: false, message: 'Error: La sesión de verificación no coincide. Intente de nuevo desde el paso de olvido de contraseña.' };
        }
        if (!this.resetCode || !this.resetCodeExpires) {
          return { success: false, message: 'No hay un código de reseteo activo. Por favor, solicite uno nuevo.' };
        }
        if (this.resetCodeExpires < Date.now()) {
          this.resetCode = null;
          this.resetCodeExpires = null;
          this.emailForReset = null;
          return { success: false, message: 'El código de verificación ha expirado. Por favor, solicite uno nuevo.' };
        }
        if (this.resetCode === code) {
          this.isCodeVerifiedForReset = true;
          return { success: true, message: 'Código verificado correctamente.' };
        } else {
          return { success: false, message: 'El código de verificación es incorrecto.' };
        }
      })
    );
  }

  canResetPassword(): boolean {
    return this.isCodeVerifiedForReset && !!this.emailForReset;
  }

  updatePassword(email: string, newPassword: string): Observable<{ success: boolean, message?: string }> {
    return of(null).pipe(
      delay(500),
      rxjsMap(() => {
        if (!this.isCodeVerifiedForReset || this.emailForReset !== email) {
          return { success: false, message: 'No se puede actualizar la contraseña. Proceso de verificación inválido o email no coincide.' };
        }

        const userIndex = this.registeredUsers.findIndex(u => u.email === email);
        if (userIndex === -1) {
          return { success: false, message: 'Usuario no encontrado para actualizar la contraseña.' };
        }

        this.registeredUsers[userIndex].password = newPassword;
        console.log(`AUTH_SERVICE: Contraseña actualizada para ${email} a "${newPassword}"`);


        this.emailForReset = null;
        this.resetCode = null;
        this.resetCodeExpires = null;
        this.isCodeVerifiedForReset = false;

        return { success: true, message: '¡Tu contraseña ha sido actualizada con éxito!' };
      })
    );
  }
}
