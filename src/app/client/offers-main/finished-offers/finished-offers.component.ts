import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interfaz para un técnico asignado
interface AssignedTechnician {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

// Interfaz para una reseña individual
interface Review {
  id: string;
  authorName: string;
  authorImageUrl?: string;
  date: string;
  isVerifiedAuthor?: boolean;
  rating: number;
  comment: string;
}

// Interfaz para una oferta finalizada
interface FinishedJobOffer {
  id: string;
  title: string;
  statusLabel: string;
  description: string;
  technician: AssignedTechnician;
  overallReviewSummary: {
    averageRating: number;
    totalReviews: number;
    totalComments: number;
    aspectRatings?: {
      responsibility: number;
      punctuality: number;
      kindness: number;
    }
  };
  reviews: Review[];
}

@Component({
  selector: 'app-finished-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './finished-offers.component.html',
  styleUrls: ['./finished-offers.component.css']
})
export class FinishedOffersComponent implements OnInit {

  finishedOffers: FinishedJobOffer[] = [];
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loadFinishedOffers();
  }

  loadFinishedOffers(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.finishedOffers = [
        {
          id: 'offer-finished-456',
          title: 'Técnico de Mantenimiento General',
          statusLabel: 'Finalizado',
          description: 'Estamos en la búsqueda de un electricista calificado para realizar servicios a domicilio en instalaciones, mantenimiento y reparaciones eléctricas. El profesional debe tener conocimientos en redes eléctricas residenciales y comerciales, detectar fallas, instalar luminarias, tomacorrientes, interruptores, y realizar mejoras eléctricas en general.',
          technician: {
            id: 2,
            name: 'Teodoro Casanova',
            specialty: 'Electricista',
            rating: 4.7,
            reviews: 155,
            imageUrl: 'assets/img/Teodora Casanova.png'
          },
          overallReviewSummary: {
            averageRating: 5.0,
            totalReviews: 122,
            totalComments: 155,
            aspectRatings: {
              responsibility: 5,
              punctuality: 5,
              kindness: 5
            }
          },
          reviews: [
            {
              id: 'rev1',
              authorName: 'Kail',
              authorImageUrl: 'assets/img/default-avatar.png',
              date: '22 Jul',
              isVerifiedAuthor: true,
              rating: 5,
              comment: 'Kail was amazing with our cats! This was our first time using a pet-sitting service, so we were naturally quite anxious. We took a chance on Kail and completely lucked out! We booked Kail to come twice a day for three days.'
            },
            {
              id: 'rev2',
              authorName: 'Ana S.',
              authorImageUrl: 'assets/img/default-avatar.png', // Placeholder
              date: '15 Jun',
              isVerifiedAuthor: false,
              rating: 4,
              comment: 'Buen servicio, aunque llegó un poco tarde. El trabajo quedó bien hecho.'
            }
          ]
        },
      ];
      this.isLoading = false;
    }, 500);
  }

  // Método para manejar el error de carga de imagen
  handleImageError(event: Event, descriptiveName: string): void {
    console.warn(`No se pudo cargar la imagen para ${descriptiveName}. Usando imagen por defecto si aplica.`);
    const target = event.target as HTMLImageElement; // Aserción de tipo
    if (target) {

      if (descriptiveName.includes('avatar')) {
        target.src = 'assets/img/default-avatar.png';
      } else {
        target.src = 'assets/img/default-tech.png';
      }
    }
  }

  // Métodos para generar estrellas en la plantilla
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    const flooredRating = Math.floor(rating);
    return Array(5 - flooredRating).fill(0);
  }
}
