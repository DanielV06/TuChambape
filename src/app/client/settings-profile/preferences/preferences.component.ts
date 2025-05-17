import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]

// Interfaz para las preferencias del usuario
interface UserPreferences {
  preferredCategory: string;
  preferredLocation: string; // Distrito
  preferredServiceType: string;
  preferredExperienceYears: string;
  preferredAvailability: string;
  minAcceptableRating: number; // 0 si no hay preferencia
  estimatedBudgetRange: string;
  languages: { // Para el selector de idiomas
    spanish: boolean;
    english: boolean;
    portuguese: boolean;
    other: boolean;
    otherLanguageName?: string;
  };
}

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  userPreferences: UserPreferences = {
    preferredCategory: '',
    preferredLocation: '',
    preferredServiceType: '',
    preferredExperienceYears: '',
    preferredAvailability: '',
    minAcceptableRating: 0,
    estimatedBudgetRange: '',
    languages: {
      spanish: true,
      english: false,
      portuguese: false,
      other: false,
      otherLanguageName: ''
    }
  };


  categories: string[] = ['Electricista', 'Gasfitero', 'Carpintero', 'Pintor', 'Estilista', 'Técnico en electrodomésticos', 'Albañil'];
  locations: string[] = ['Miraflores', 'San Isidro', 'Surco', 'La Molina', 'Lince', 'Centro de Lima', 'Callao'];
  serviceTypes: string[] = ['A domicilio', 'En local', 'Ambos'];
  experienceRanges: string[] = ['Cualquiera', '0-2 años', '3-5 años', '6-10 años', '10+ años'];
  availabilityOptions: string[] = ['Cualquier día', 'Entre semana', 'Fines de semana', 'Mañanas', 'Tardes', 'Noches'];
  ratingOptions: { value: number, label: string }[] = [
    { value: 0, label: 'Cualquiera' },
    { value: 3, label: '3 ★ o más' },
    { value: 4, label: '4 ★ o más' },
    { value: 4.5, label: '4.5 ★ o más' },
    { value: 5, label: '5 ★' }
  ];
  budgetRanges: string[] = ['Cualquiera', 'Menos de S/50', 'S/50 - S/100', 'S/100 - S/200', 'S/200 - S/500', 'Más de S/500'];

  isLoading: boolean = false;
  successMessage: string | null = null;
  generalError: string | null = null; // Si hubiera errores de guardado

  constructor() { }

  ngOnInit(): void {
    this.loadUserPreferences();
  }

  loadUserPreferences(): void {
    this.isLoading = true;

    setTimeout(() => {

      this.isLoading = false;
    }, 500);
  }

  savePreferences(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.generalError = null;

    // Validaciones
    if (this.userPreferences.languages.other && !this.userPreferences.languages.otherLanguageName) {
      this.generalError = "Si selecciona 'Otro' idioma, por favor especifique cuál.";
      this.isLoading = false;
      return;
    }

    console.log('Guardando preferencias del usuario:', this.userPreferences);


    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = '¡Preferencias guardadas con éxito! (Simulado)';
      setTimeout(() => this.successMessage = null, 3000);
    }, 1000);
  }


  applyColumnFilters(column: 'left' | 'right'): void {
    console.log(`Aplicando filtros de columna ${column} (simulado)`);

  }

  clearColumnFilters(column: 'left' | 'right'): void {
    console.log(`Borrando filtros de columna ${column} (simulado)`);

  }
}
