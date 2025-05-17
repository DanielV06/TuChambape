import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para los [(ngModel)] de los filtros

// Interfaz para los detalles de un técnico en la vista de comparación
interface TechnicianForCompare {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  availability: {
    lunes?: string;
    martes?: string;
    miercoles?: string;
    jueves?: string;
    viernes?: string;
    sabado?: string;
    domingo?: string;
  };
  rating: number;
  reviews: number;
  certificationType: string;
  experienceYears: number;
}

@Component({
  selector: 'app-compare-profiles',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule para los filtros
  templateUrl: './compare-profiles.component.html',
  styleUrls: ['./compare-profiles.component.css']
})
export class CompareProfilesComponent implements OnInit {

  // Técnicos simulados para la comparación
  techniciansToCompare: TechnicianForCompare[] = [];

  // Modelos para los filtros superiores
  filters = {
    onlyFavorites: false,
    availability: '', // Podría ser un día específico o 'cualquier'
    minRating: 0,
    certificationType: ''
  };

  // Opciones para los selectores de filtros
  availabilityOptions: string[] = ['Cualquier día', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  certificationTypes: string[] = ['Técnico certificado', 'Formación autodidacta', 'Institución Técnica', 'Ninguna'];

  constructor() { }

  ngOnInit(): void {
    this.loadTechniciansForComparison();
  }

  loadTechniciansForComparison(): void {

    this.techniciansToCompare = [
      {
        id: 1,
        name: 'Juan González',
        specialty: 'Electricista',
        imageUrl: 'assets/img/juan-gonzalez.jpg',
        availability: { lunes: '8-12', martes: '8-12', miercoles: '1-5', jueves: '1-5', viernes: '8-5' },
        rating: 4.7,
        reviews: 210,
        certificationType: 'Técnico certificado',
        experienceYears: 5
      },
      {
        id: 2,
        name: 'Teodora Casanova',
        specialty: 'Electricista',
        imageUrl: 'assets/img/Teodora Casanova.png',
        availability: { lunes: '1-5', martes: '1-5', miercoles: 'No', jueves: 'No', viernes: '1-5', sabado: '9-1' },
        rating: 4.5,
        reviews: 180,
        certificationType: 'Formación autodidacta',
        experienceYears: 8
      },
      {
        id: 3,
        name: 'Gracia Espinoza',
        specialty: 'Estilista', // Cambiamos para variedad
        imageUrl: 'assets/img/Gracia Espinoza.png',
        availability: { martes: '10-6', jueves: '10-6', sabado: '10-2' },
        rating: 4.9,
        reviews: 55,
        certificationType: 'Institución Técnica',
        experienceYears: 3
      }
    ];
  }

  applyFilters(): void {

    console.log('Aplicando filtros de comparación (simulado):', this.filters);
  }

  resetFilters(): void {
    this.filters = {
      onlyFavorites: false,
      availability: '',
      minRating: 0,
      certificationType: ''
    };
    console.log('Filtros de comparación reseteados.');

  }

  // Para generar estrellas en la plantilla
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  getEmptyStars(rating: number): number[] {
    const flooredRating = Math.floor(rating);
    return Array(5 - flooredRating).fill(0);
  }

  // Para el gráfico de disponibilidad
  getAvailabilitySlots(availability: TechnicianForCompare['availability']): { day: string, available: boolean, period?: string }[] {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const displaySlots: { day: string, available: boolean, period?: string }[] = [];
    const keyMapping: { [key: string]: keyof TechnicianForCompare['availability'] } = {
      'Lunes': 'lunes', 'Martes': 'martes', 'Miércoles': 'miercoles',
      'Jueves': 'jueves', 'Viernes': 'viernes', 'Sábado': 'sabado', 'Domingo': 'domingo'
    };

    for (const day of days) {
      const key = keyMapping[day];
      if (availability[key]) {
        displaySlots.push({ day: day.substring(0,1), available: true, period: availability[key] });
      } else {
        displaySlots.push({ day: day.substring(0,1), available: false });
      }
    }
    return displaySlots;
  }

  // Metodo para manejar el error de carga de imagen
  handleImageError(event: Event, technicianName: string): void {
    console.warn(`No se pudo cargar la imagen para ${technicianName}. Usando imagen por defecto.`);
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/img/default-tech.png';
    }
  }
}
