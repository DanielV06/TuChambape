import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule], // Añade CommonModule
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {
  // Datos simulados (ejemplos)
  profileCompletion: number = 55;
  suggestedTechnicians: number = 540;
  newTechniciansThisWeek: number = 300;
  techniciansByYourSearches: number = 240;

  contactedTechniciansResponded: number = 4;
  contactedTechniciansTotal: number = 7; // Asumiendo que 7 es el total de contactados

  favoriteTechnicians: number = 15;
  comparedTechnicians: number = 6;

  reviewsLeft: number = 5;
  pendingReviews: number = 10;

  // Para el gráfico de búsquedas
  searchData = [
    { day: 'L', value: 10 }, { day: 'M', value: 15 }, { day: 'M', value: 5 },
    { day: 'J', value: 20 }, { day: 'V', value: 12 }, { day: 'S', value: 18 }, { day: 'D', value: 8 }
  ];
  maxSearchValue = 20; // Para calcular la altura de las barras

  constructor() { }
}
