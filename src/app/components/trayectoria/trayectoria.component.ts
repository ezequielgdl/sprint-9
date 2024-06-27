import { Component } from '@angular/core';

@Component({
  selector: 'app-trayectoria',
  standalone: true,
  imports: [],
  templateUrl: './trayectoria.component.html',
  styleUrl: './trayectoria.component.css',
})
export class TrayectoriaComponent {
  eventos = [
    {
      title: 'Nace IWF Argentina',
      year: '2004',
      description:
        'IWF establece base en nuestro país. Mujeres de distintos ámbitos, reconocidas profesionales y protagonistas en su acción transformadora en la sociedad, iniciaron la trayectoria de IWF Argentina',
    },
    {
      title: 'EL DESAFÍO DE CONSTRUIR EL BIEN COMÚN',
      year: '2006',
      description:
        'Diálogo abierto y plural con las candidatas a legisladoras y políticas. Elisa Carrió, Norma Morandini, Patricia Bullrich, Hilda “Chiche” Duhalde, Vilma Ripoll, Marta Oyhanarte.',
    },
  ];
}
