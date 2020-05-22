import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';



const pagesRoutes: Routes = [
    {
      path: '',
      component: PagesComponent,
      canActivate: [ LoginGuardGuard ],
      children: [                  // data: es opcional para poder cambiar nombre de la ruta
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', descripcion: 'Página para mostrar un dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Barras de Progreso', descripcion: ' Página para mostrar barras de progreso' } },
        { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas', descripcion: 'Página para mostrar gráficas de dona' } },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', descripcion: 'Página para mostrar un ejercicio de promesas' } },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS', descripcion: 'Página para mostrar ejercicio de observables' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
        // Mantenimientos
        {
          path: 'usuarios',
          component: UsuariosComponent,
          canActivate: [ AdminGuard ],
          data: { titulo: 'Mantenimiento de usuario' }
        },
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualización de médico' } },
        { path: '', pathMatch:'full', redirectTo: '/dashboard' }
      ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
