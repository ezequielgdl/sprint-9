import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { TrayectoriaComponent } from './components/trayectoria/trayectoria.component';
import { IwfComponent } from './components/iwf/iwf.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'iwf', component: IwfComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'trayectoria', component: TrayectoriaComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];
