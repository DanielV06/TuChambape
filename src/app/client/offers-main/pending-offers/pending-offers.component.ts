import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';


interface AssignedTechnician {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

interface ProjectDetails {
  workScheduleProgress: number;
  address: string;
  budget: string;
  mapImageUrl: string;
}

interface PendingOffer {
  id: string;
  title: string;
  statusLabel: string;
  description: string;
  technician: AssignedTechnician;
  projectDetails: ProjectDetails;
  paymentAmount?: number;
}

@Component({
  selector: 'app-pending-offers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pending-offers.component.html',
  styleUrls: ['./pending-offers.component.css']
})
export class PendingOffersComponent implements OnInit {

  offer: PendingOffer | null = null;
  isLoading: boolean = false;
  currentStep: 'details' | 'payment' | 'paymentSuccess' = 'details';

  paymentInfo = {
    acceptTerms: false
  };


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadPendingOffer();
  }

  loadPendingOffer(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.offer = {
        id: 'offer-pending-123',
        title: 'Técnico de Mantenimiento General',
        statusLabel: 'En Progreso',
        description: 'Estamos en la búsqueda de un electricista calificado para realizar servicios a domicilio en instalaciones, mantenimiento y reparaciones eléctricas. El profesional debe tener conocimientos en redes eléctricas residenciales y comerciales, detectar fallas, instalar luminarias, tomacorrientes, interruptores, y realizar mejoras eléctricas en general.',
        technician: {
          id: 2,
          name: 'Teodoro Casanova',
          specialty: 'Electricista',
          rating: 4.7,
          reviews: 150,
          imageUrl: 'assets/img/Teodora Casanova.png'
        },
        projectDetails: {
          workScheduleProgress: 60,
          address: 'Calle Monte de Ocoña 123, Surco',
          budget: 'PEN 400 - PEN 500 (Sujeto a eventualidades)',
          mapImageUrl: 'assets/img/mapa-placeholder.png'
        },
        paymentAmount: 80.00
      };
      this.isLoading = false;
    }, 500);
  }

  proceedToPayment(): void {
    if (this.offer) {
      this.offer.statusLabel = "Pendiente de Pago";
      this.currentStep = 'payment';
      console.log('Procediendo al pago para la oferta:', this.offer.title);
    }
  }

  submitPayment(): void {
    if (!this.paymentInfo.acceptTerms && this.currentStep === 'payment') {
      alert('Debe aceptar los términos para compartir su correo antes de realizar el pedido.');
      return;
    }

    this.isLoading = true;
    console.log('Procesando pago...');
    setTimeout(() => {
      this.isLoading = false;
      this.currentStep = 'paymentSuccess';
      console.log('Pago realizado con éxito!');
    }, 1500);
  }

  finishPaymentFlow(): void {
    console.log('Flujo de pago finalizado. Redirigiendo...');
    this.offer = null;
    this.currentStep = 'details';

    alert("Serás redirigido a la lista de ofertas o a la sección de finalizadas.");

  }

  handleImageError(event: Event, imageName: string): void {
    console.warn(`No se pudo cargar la imagen ${imageName}. Usando imagen por defecto si aplica.`);
    const target = event.target as HTMLImageElement;
    if (target) {

    }
  }

  getFloor(value: number): number {
    return Math.floor(value);
  }
}
