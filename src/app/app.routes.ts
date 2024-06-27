import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { TrayectoriaComponent } from './components/trayectoria/trayectoria.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'trayectoria', component: TrayectoriaComponent },
];
