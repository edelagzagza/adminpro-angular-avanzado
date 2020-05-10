import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/service.index';



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
        { path: '', pathMatch:'full', redirectTo: '/dashboard' }
      ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
