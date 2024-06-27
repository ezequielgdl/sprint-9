import { Component } from '@angular/core';
import { Member } from '../../interface';

@Component({
  selector: 'app-iwf',
  standalone: true,
  imports: [],
  templateUrl: './iwf.component.html',
  styleUrl: './iwf.component.css',
})
export class IwfComponent {
  autoridades: Member[] = [
    {
      name: 'Graciela Romer',
      title: 'Vocal Suplente',
    },
    {
      name: 'Silvia Fesquest',
      title: 'Presidenta',
    },
  ];

  socias: Member[] = [
    {
      name: 'Marta Cristina Antonelli',
      title:
        'Investigadora principal - Instituto de Biología Celular y Neurociencias - Facultad de Medicina UBA - CONICET',
    },
    {
      name: 'Claudia Alvarez Arguello',
      title: 'Vicepresidente y CEO Alvarez Arguelles Hoteles',
    },
  ];
}
