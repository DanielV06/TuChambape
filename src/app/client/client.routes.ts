import { Routes } from '@angular/router';
import { LayoutComponent as ClientLayoutComponent } from './layout/layout.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { SearchTechniciansComponent } from './search-technicians/search-technicians.component';
import { OffersMainComponent } from './offers-main/offers-main.component';
import { CompareProfilesComponent } from './compare-profiles/compare-profiles.component';
import { SettingsProfileComponent } from './settings-profile/settings-profile.component';
import { authGuard } from '../auth/guards/auth.guard';
import { CreateOfferComponent } from './offers-main/create-offer/create-offer.component';
import { ActiveOffersComponent } from './offers-main/active-offers/active-offers.component';
import { PendingOffersComponent } from './offers-main/pending-offers/pending-offers.component';
import { FinishedOffersComponent } from './offers-main/finished-offers/finished-offers.component';
import { PersonalDataComponent } from './settings-profile/personal-data/personal-data.component';
import { PreferencesComponent } from './settings-profile/preferences/preferences.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: HomeDashboardComponent, title: 'Inicio - JobConnect' },
      { path: 'buscar-tecnicos', component: SearchTechniciansComponent, title: 'Buscar Técnicos - JobConnect' },
      {
        path: 'ofertas',
        component: OffersMainComponent,
        title: 'Mis Ofertas - JobConnect',
        children: [
          { path: '', redirectTo: 'activas', pathMatch: 'full' },
          { path: 'crear', component: CreateOfferComponent, title: 'Crear Oferta - JobConnect' },
          { path: 'activas', component: ActiveOffersComponent, title: 'Ofertas Activas - JobConnect' },
          { path: 'pendientes', component: PendingOffersComponent, title: 'Ofertas Pendientes - JobConnect' },
          { path: 'finalizadas', component: FinishedOffersComponent, title: 'Ofertas Finalizadas - JobConnect' }
        ]
      },
      { path: 'comparar-perfiles', component: CompareProfilesComponent, title: 'Comparar Perfiles - JobConnect' },
      {
        path: 'configuracion',
        component: SettingsProfileComponent,
        title: 'Configuración - JobConnect',
        children: [ // Rutas hijas para las pestañas de configuración
          { path: '', redirectTo: 'datos-personales', pathMatch: 'full' }, // Por defecto muestra 'datos-personales'
          { path: 'datos-personales', component: PersonalDataComponent, title: 'Datos Personales - JobConnect' },
          { path: 'preferencias', component: PreferencesComponent, title: 'Preferencias - JobConnect' }
        ]
      }
    ]
  }
];
