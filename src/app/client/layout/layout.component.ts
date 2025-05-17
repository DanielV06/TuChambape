import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service'; // Para el nombre de usuario y logout
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent { // Renombrado de ClientLayoutComponent para coincidir con el selector y el archivo
  userName: string = 'James Cooper';
  userEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userEmail = this.authService.getCurrentUserEmail();

  }

  logout() {
    this.authService.clearCurrentUser();
    this.router.navigate(['/login']);
  }
}
