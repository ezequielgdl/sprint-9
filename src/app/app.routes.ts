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
import { EventoComponent } from './pages/evento/evento.component';
import { ContactComponent } from './components/contact/contact.component';
import { SociasComponent } from './pages/socias/socias.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { MembersComponent } from './components/dashboard/members/members.component';
import { ActividadesDbComponent } from './components/dashboard/actividades-db/actividades-db.component';
import { NoticiasDbComponent } from './components/dashboard/noticias-db/noticias-db.component';
import { TrayectoriaDbComponent } from './components/dashboard/trayectoria-db/trayectoria-db.component';
import { CreateComponent } from './components/dashboard/create/create.component';

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
    children: [
      { path: '', component: MembersComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'members', component: MembersComponent },
      { path: 'actividades', component: ActividadesDbComponent },
      { path: 'noticias', component: NoticiasDbComponent },
      { path: 'trayectoria', component: TrayectoriaDbComponent },
      { path: 'create', component: CreateComponent },
      { path: 'member/:id', component: UpdateMemberComponent },
      { path: 'event/:id', component: UpdateEventComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'evento/:id', component: EventoComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'socias', component: SociasComponent },
];
