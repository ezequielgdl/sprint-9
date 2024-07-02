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
    {
      title: 'CONFERENCIA GLOBAL “EL ASCENSO DE LAS MUJERES LÍDERES”',
      year: '2008',
      description:
        'Evento internacional con la participación de representantes de la red global y regional. Más de 500 mujeres líderes en los distintos ámbitos de todo el mundo reunidas en Buenos Aires para debatir sobre las tendencias políticas y económicas en la Era del avance del Liderazgo de las Mujeres. Diálogos de Liderazgo sobre el impacto del accionar femenino, sus respuestas ante las problemáticas y su responsabilidad de producir cambios en el mundo. Con la presencia de Esther Silver-Parker, Presidenta de IWF Global y Ma. Eugenia Estenssoro como presidenta del IWF Argentina.',
    },
  ];
}
