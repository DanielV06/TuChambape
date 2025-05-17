import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Lógica de autenticación simulada:


  if (authService.isLoggedIn()) {
    return true; // El usuario puede acceder a la ruta
  } else {
    // El usuario no está logueado, redirigir a la página de login
    console.warn('Acceso denegado por AuthGuard. Redirigiendo a /login');
    router.navigate(['/login']);
    return false; // El usuario no puede acceder a la ruta
  }
};
