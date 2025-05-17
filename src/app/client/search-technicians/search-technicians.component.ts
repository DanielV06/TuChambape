import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para los filtros

// Interfaz para un técnico
interface Technician {
  id: number; // ID único para trackBy
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  isVerified?: boolean;

  location?: string;
  availability?: string;
  serviceType?: string;
  certificationType?: string;
  experienceYears?: number;
}

@Component({
  selector: 'app-search-technicians',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-technicians.component.html',
  styleUrls: ['./search-technicians.component.css']
})
export class SearchTechniciansComponent implements OnInit {

  // Datos para los técnicos con IDs únicos y algunas propiedades adicionales
  technicians: Technician[] = [
    { id: 1, name: 'Juan González', specialty: 'Electricista', rating: 4.7, reviews: 210, imageUrl: 'assets/img/juan-gonzalez.jpg', isVerified: true, location: 'Miraflores', experienceYears: 5, availability: 'immediate', serviceType: 'domicilio', certificationType: 'tecnico' },
    { id: 2, name: 'Teodora Casanova', specialty: 'Electricista', rating: 4.5, reviews: 180, imageUrl: 'assets/img/Teodora Casanova.png', location: 'San Isidro', experienceYears: 8, availability: 'next_days', serviceType: 'domicilio', certificationType: 'institucion' },
    { id: 3, name: 'Gracia Espinoza', specialty: 'Estilista', rating: 4.9, reviews: 55, imageUrl: 'assets/img/Gracia Espinoza.png', isVerified: true, location: 'Surco', experienceYears: 3, availability: 'specific_date', serviceType: 'local', certificationType: 'autodidacta' },
    { id: 4, name: 'Carlos Pérez', specialty: 'Técnico en electrodomésticos', rating: 4.2, reviews: 90, imageUrl: 'assets/img/Carlos Perez.png', isVerified: true, location: 'Miraflores', experienceYears: 10, availability: 'immediate', serviceType: 'domicilio', certificationType: 'tecnico' },
    { id: 5, name: 'Enrique López', specialty: 'Electricista', rating: 4.0, reviews: 120, imageUrl: 'assets/img/Enrique Lopez.png', location: 'La Molina', experienceYears: 2, availability: 'next_days', serviceType: 'domicilio', certificationType: 'autodidacta' },
    { id: 6, name: 'Pedro Cáceres', specialty: 'Carpintero', rating: 4.8, reviews: 150, imageUrl: 'assets/img/Pedro Caceres.png', location: 'Lince', experienceYears: 15, availability: 'immediate', serviceType: 'local', certificationType: 'tecnico' },
    { id: 7, name: 'Claudio Rivera', specialty: 'Pintor de obras', rating: 4.3, reviews: 70, imageUrl: 'assets/img/Claudio Rivera.png', isVerified: true, location: 'San Isidro', experienceYears: 7, availability: 'specific_date', serviceType: 'domicilio', certificationType: 'institucion' },
    { id: 8, name: 'Yeri Kimio', specialty: 'Gasfitero', rating: 4.6, reviews: 110, imageUrl: 'assets/img/Yeri Kimio.png', location: 'Surco', experienceYears: 4, availability: 'immediate', serviceType: 'domicilio', certificationType: 'autodidacta' },
    { id: 9, name: 'Lucas Zapata', specialty: 'Albañil', rating: 4.1, reviews: 60, imageUrl: 'assets/img/Lucas Zapata.png', location: 'Miraflores', experienceYears: 1, availability: 'next_days', serviceType: 'domicilio', certificationType: 'tecnico' },
  ];

  filteredTechnicians: Technician[] = [];

  // Opciones para los filtros
  categories: string[] = ['Electricista', 'Gasfitero', 'Carpintero', 'Pintor', 'Estilista', 'Técnico en electrodomésticos', 'Albañil'];
  districts: string[] = ['Miraflores', 'San Isidro', 'Surco', 'La Molina', 'Lince'];
  availabilityOptions: { value: string, label: string }[] = [
    { value: 'immediate', label: 'Inmediata' },
    { value: 'next_days', label: 'Próximos días' },
    { value: 'specific_date', label: 'Fecha específica' }
  ];
  serviceTypeOptions: { value: string, label: string }[] = [
    { value: 'domicilio', label: 'A domicilio' },
    { value: 'local', label: 'En local' }
  ];
  certificationTypeOptions: { value: string, label: string }[] = [
    { value: 'tecnico', label: 'Técnico certificado' },
    { value: 'autodidacta', label: 'Formación autodidacta' },
    { value: 'institucion', label: 'Institución Técnica' }
  ];


  // Modelos para los valores de los filtros
  filters = {
    category: '', // String vacío significa "Todas" o "Cualquiera"
    district: '',
    availability: '',
    minRating: 0,    // 0 significa "Cualquiera"
    serviceType: '',
    certificationType: '',
    experienceYears: 0 // 0 significa "Cualquiera"
  };


  constructor() { }

  ngOnInit(): void {
    this.applyFilters(); // Aplicar filtros iniciales
  }

  applyFilters(): void {
    let result: Technician[] = [...this.technicians];

    // Filtrar por Categoría
    if (this.filters.category) {
      result = result.filter(tech => tech.specialty.toLowerCase() === this.filters.category.toLowerCase());
    }

    // Filtrar por Distrito
    if (this.filters.district) {
      result = result.filter(tech => tech.location?.toLowerCase() === this.filters.district.toLowerCase());
    }

    // Filtrar por Disponibilidad
    if (this.filters.availability) {
      result = result.filter(tech => tech.availability === this.filters.availability);
    }

    // Filtrar por Valoración Mínima
    if (this.filters.minRating > 0) {
      result = result.filter(tech => tech.rating >= this.filters.minRating);
    }

    // Filtrar por Tipo de Servicio
    if (this.filters.serviceType) {
      result = result.filter(tech => tech.serviceType === this.filters.serviceType);
    }

    // Filtrar por Tipo de Certificación
    if (this.filters.certificationType) {
      result = result.filter(tech => tech.certificationType === this.filters.certificationType);
    }

    // Filtrar por Años de Experiencia (mayor o igual)
    if (this.filters.experienceYears > 0) {
      result = result.filter(tech => tech.experienceYears !== undefined && tech.experienceYears >= this.filters.experienceYears);
    }

    this.filteredTechnicians = result;
    console.log("Filtros aplicados:", this.filters, "Resultados:", this.filteredTechnicians.length);
  }

  reportProfile(technician: Technician): void {
    alert(`Reportar perfil de: ${technician.name}`);
  }

  handleImageError(event: Event, technicianName: string): void {
    console.warn(`No se pudo cargar la imagen para ${technicianName}. Usando imagen por defecto.`);
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/img/default-tech.png';
    }
  }

  trackByTechnicianId(index: number, technician: Technician): number {
    return technician.id;
  }
}
