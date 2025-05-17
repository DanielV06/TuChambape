import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { AuthService } from '../../../auth/services/auth.service'; // Para obtener el email actual

// Interfaz para los datos del perfil del usuario
interface UserProfile {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  gender: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  email: string;
  registrationDate: string;
}

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    documentType: 'DNI', // Valor por defecto
    documentNumber: '',
    birthDate: '',
    gender: 'Masculino', // Valor por defecto
    phone: '',
    country: 'Perú', // Valor por defecto
    city: 'Lima', // Valor por defecto
    address: '',
    email: '',
    registrationDate: '17-04-2022'
  };

  // Opciones para selects
  documentTypes: string[] = ['DNI', 'Pasaporte', 'Carné de Extranjería'];
  genders: string[] = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'];
  countries: string[] = ['Perú', 'Argentina', 'Colombia', 'Chile', 'México']; // Ejemplo
  cities: { [country: string]: string[] } = { // Ciudades por país
    'Perú': ['Lima', 'Arequipa', 'Trujillo', 'Cusco'],
    'Argentina': ['Buenos Aires', 'Córdoba', 'Rosario'],
    'Colombia': ['Bogotá', 'Medellín', 'Cali'],
    'Chile': ['Santiago', 'Valparaíso', 'Concepción'],
    'México': ['Ciudad de México', 'Guadalajara', 'Monterrey']
  };
  availableCities: string[] = [];


  isLoading: boolean = false;
  successMessage: string | null = null;
  generalError: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserProfile();
    // Inicializar ciudades disponibles basado en el país por defecto
    this.onCountryChange(this.userProfile.country);
  }

  loadUserProfile(): void {
    this.isLoading = true;

    setTimeout(() => {
      const currentUserEmail = this.authService.getCurrentUserEmail();


      this.userProfile = {
        firstName: 'James',
        lastName: 'Cooper',
        documentType: 'DNI',
        documentNumber: '77894567',
        birthDate: '1997-08-15',
        gender: 'Masculino',
        phone: '987654321',
        country: 'Perú',
        city: 'Lima',
        address: 'Av. Primavera 567, Dpto F-104',
        email: currentUserEmail || 'janecooper@gmail.com',
        registrationDate: '17-04-22'
      };
      this.onCountryChange(this.userProfile.country); // Actualizar ciudades
      this.isLoading = false;
    }, 500);
  }

  onCountryChange(countryValue: string): void {
    this.availableCities = this.cities[countryValue] || [];
    if (!this.availableCities.includes(this.userProfile.city)) {

      this.userProfile.city = '';
    }
  }

  saveChanges(): void {
    this.isLoading = true;
    this.successMessage = null;
    this.generalError = null;


    if (!this.userProfile.firstName || !this.userProfile.lastName) {
      this.generalError = "Nombres y Apellidos son requeridos.";
      this.isLoading = false;
      return;
    }


    console.log('Guardando perfil del usuario:', this.userProfile);


    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = '¡Datos guardados con éxito! (Simulado)';

      setTimeout(() => this.successMessage = null, 3000);
    }, 1000);
  }
}
