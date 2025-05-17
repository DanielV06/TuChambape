import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './auth/verify-code/verify-code.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [
  // Rutas de Autenticación
  { path: 'login', component: LoginComponent, title: 'Iniciar Sesión - JobConnect' },
  { path: 'register', component: RegisterComponent, title: 'Crear Cuenta - JobConnect' },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Recuperar Contraseña - JobConnect' },
  { path: 'verify-code', component: VerifyCodeComponent, title: 'Verificar Código - JobConnect' },
  { path: 'reset-password', component: ResetPasswordComponent, title: 'Reestablecer Contraseña - JobConnect' },


  {
    path: 'client',
    loadChildren: () => import('./client/client.routes').then(m => m.CLIENT_ROUTES)

  },

  // Rutas por defecto y comodín
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } // O a una página 404
];
