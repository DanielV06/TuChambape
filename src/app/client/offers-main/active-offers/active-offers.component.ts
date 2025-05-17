import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Importa Router y RouterModule

// Interfaz para un técnico
interface OfferTechnician {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  specialty?: string;
}

// Interfaz para una oferta activa
interface ActiveJobOffer {
  id: string; // O número
  title: string;
  description: string;
  applicants: OfferTechnician[]; // Técnicos que han aplicado o son sugeridos
}

@Component({
  selector: 'app-active-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './active-offers.component.html',
  styleUrls: ['./active-offers.component.css']
})
export class ActiveOffersComponent implements OnInit {

  activeOffers: ActiveJobOffer[] = []; // Array para almacenar múltiples ofertas activas
  isLoading: boolean = false;

  constructor(private router: Router) { } // Inyecta Router si necesitas navegar programáticamente

  ngOnInit(): void {
    this.loadActiveOffers();
  }

  loadActiveOffers(): void {
    this.isLoading = true;
    // carga de datos
    setTimeout(() => {
      this.activeOffers = [
        {
          id: 'offer1',
          title: 'Se busca Técnico Electricista a Domicilio',
          description: 'Estamos en la búsqueda de un electricista calificado para realizar servicios a domicilio en instalaciones, mantenimiento y reparaciones eléctricas. El profesional debe tener conocimientos en redes eléctricas residenciales y comerciales, detectar fallas, instalar luminarias, tomacorrientes, interruptores, y realizar mejoras eléctricas en general.',
          applicants: [
            { id: 1, name: 'Juan González', imageUrl: 'assets/img/default-tech.png', rating: 5, specialty: 'Electricista' },
            { id: 2, name: 'Teodora Casanova', imageUrl: 'assets/img/Teodora Casanova.png', rating: 5, specialty: 'Electricista' },
            { id: 3, name: 'Carlos Pérez', imageUrl: 'assets/img/Carlos Perez.png', rating: 4, specialty: 'Téc. Electrodomésticos' },
            { id: 4, name: 'Enrique López', imageUrl: 'assets/img/Enrique Lopez.png', rating: 5, specialty: 'Electricista' },
            { id: 5, name: 'Pedro Cáceres', imageUrl: 'assets/img/Pedro Caceres.png', rating: 3, specialty: 'Carpintero' },
            { id: 6, name: 'Yeri Kimio', imageUrl: 'assets/img/Yeri Kimio.png', rating: 5, specialty: 'Gasfitero' },
          ]
        },

      ];
      this.isLoading = false;
    }, 500);
  }

  // Funciones para interactuar con los técnicos
  viewTechnicianProfile(technicianId: number): void {
    console.log('Ver perfil del técnico ID:', technicianId);

  }

  selectTechnician(offerId: string, technicianId: number): void {
    console.log(`Seleccionar técnico ID: ${technicianId} para la oferta ID: ${offerId}`);
    // Lógica para marcar como seleccionado o iniciar proceso de contratación.

  }

  // Método para manejar el error de carga de imagen
  handleImageError(event: Event, applicantName: string): void {
    console.warn(`No se pudo cargar la imagen para ${applicantName}. Usando imagen por defecto.`);
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'assets/img/default-tech.png';
    }
  }
}
