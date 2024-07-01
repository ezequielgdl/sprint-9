import { Component } from '@angular/core';
import { ImagecardComponent } from '../imagecard/imagecard.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [ImagecardComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent {
  noticias = [
    {
      title: 'Encuentro con las socias de Chile',
      subtitle: 'Reforzando lazos con las socias del país vecino',
      description: 'En su última',
      category: 'Noticias IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
    {
      title: 'Los Oscars del mundo del vino. Cuatro argentinos nominados.',
      subtitle:
        'Se dieron a conocer las nominaciones del prestigioso premio que otorga la publicación',
      description: 'Lorem',
      category: 'Noticias IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
    {
      title: 'Encuentro con las socias de Chile',
      subtitle: 'Reforzando lazos con las socias del país vecino',
      description: 'En su última',
      category: 'Noticias IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
    {
      title: 'Los Oscars del mundo del vino. Cuatro argentinos nominados.',
      subtitle:
        'Se dieron a conocer las nominaciones del prestigioso premio que otorga la publicación',
      description: 'Lorem',
      category: 'Noticias IWF Argentina',
      url: '',
      photo: 'https://placehold.co/600x400/orange/white',
    },
  ];
}
