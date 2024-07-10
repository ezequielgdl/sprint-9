import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { TrayectoriaComponent } from './pages/trayectoria/trayectoria.component';
import { IwfComponent } from './pages/iwf/iwf.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { UpdateMemberComponent } from './components/dashboard/update-member/update.component';
import { UpdateEventComponent } from './components/dashboard/update-event/update-event.component';

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
  { path: 'dashboard/member/:id', component: UpdateMemberComponent },
  { path: 'dashboard/event/:id', component: UpdateEventComponent },
];
