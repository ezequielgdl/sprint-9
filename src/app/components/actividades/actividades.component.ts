import { Component } from '@angular/core';
import { ImagecardComponent } from '../imagecard/imagecard.component';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [ImagecardComponent],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
})
export class ActividadesComponent {
  actividades = [
    {
      title: 'Encuentro Presencial IWF Argentina 2024',
      subtitle: 'Reforzando lazos con las socias del país vecino',
      description: 'En su última',
      category: 'Actividades IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
    {
      title: 'Retratos electorales con la participación de Pola Oloixarac',
      subtitle:
        'Se dieron a conocer las nominaciones del prestigioso premio que otorga la publicación',
      description: 'Lorem',
      category: 'Actividades IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
    {
      title: 'Después de las PASO',
      subtitle: 'Reforzando lazos con las socias del país vecino',
      description: 'En su última',
      category: 'Actividades IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
    {
      title: 'Conversatorio IWF',
      subtitle:
        'Se dieron a conocer las nominaciones del prestigioso premio que otorga la publicación',
      description: 'Lorem',
      category: 'Actividades IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
  ];
}
