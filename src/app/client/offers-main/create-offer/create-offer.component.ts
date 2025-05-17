import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { Router, RouterModule } from '@angular/router'; // Router para navegación


// Interfaz para la oferta de trabajo
interface JobOffer {
  title: string;
  description: string;
  category: string;
  address: string;
  languagesRequired: string;
  minExperience: string;
  certificationsNeeded: string;
  workHours: string;
  estimatedBudget: string;
  paymentMethod: string;
  acceptNotifications: boolean;
  authorizeDataProcessing: boolean;
}

@Component({
  selector: 'app-create-offer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  newOffer: JobOffer = {
    title: '',
    description: '',
    category: '',
    address: '',
    languagesRequired: '',
    minExperience: '',
    certificationsNeeded: '',
    workHours: '',
    estimatedBudget: '',
    paymentMethod: '',
    acceptNotifications: false,
    authorizeDataProcessing: false
  };

  categories: string[] = ['Electricista', 'Plomero', 'Desarrollador Web', 'Diseñador Gráfico', 'Niñera'];
  experienceLevels: string[] = ['Sin experiencia', 'Menos de 1 año', '1-2 años', '3-5 años', 'Más de 5 años'];
  workHourOptions: string[] = ['Medio Tiempo (Mañana)', 'Medio Tiempo (Tarde)', 'Tiempo Completo', 'Flexible', 'Por Horas'];
  paymentMethods: string[] = ['Transferencia Bancaria', 'Efectivo', 'Yape/Plin', 'Otro'];

  formErrors: any = {};
  generalError: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private router: Router

  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading = true;
    this.formErrors = {};
    this.generalError = null;
    this.successMessage = null;

    if (!this.newOffer.title) this.formErrors.title = 'El título de la oferta es requerido.';
    if (!this.newOffer.description) this.formErrors.description = 'La descripción es requerida.';
    if (!this.newOffer.category) this.formErrors.category = 'La categoría es requerida.';
    if (!this.newOffer.address) this.formErrors.address = 'La dirección es requerida.';
    if (!this.newOffer.minExperience) this.formErrors.minExperience = 'La experiencia mínima es requerida.';
    if (!this.newOffer.estimatedBudget) this.formErrors.estimatedBudget = 'El presupuesto es requerido.';
    if (!this.newOffer.paymentMethod) this.formErrors.paymentMethod = 'La forma de pago es requerida.';
    if (!this.newOffer.authorizeDataProcessing) this.formErrors.authorizeDataProcessing = 'Debe autorizar el tratamiento de datos.';

    if (Object.keys(this.formErrors).length > 0) {
      this.generalError = 'Por favor, corrija los errores en el formulario.';
      this.isLoading = false;
      return;
    }

    console.log('Nueva Oferta a crear:', this.newOffer);

    // guardado exitoso:
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = '¡Oferta creada con éxito!';
      this.resetForm();
      setTimeout(() => {
        if (this.successMessage) {

          this.router.navigate(['/client/ofertas/activas']);
        }
      }, 2000);
    }, 1000);
  }

  resetForm(): void {
    this.newOffer = {
      title: '', description: '', category: '', address: '',
      languagesRequired: '', minExperience: '', certificationsNeeded: '',
      workHours: '', estimatedBudget: '', paymentMethod: '',
      acceptNotifications: false, authorizeDataProcessing: false
    };
    this.formErrors = {}; // También resetea los errores específicos de campo
    this.generalError = null; // Resetea el error general

  }
}
