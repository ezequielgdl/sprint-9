import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imagecard',
  standalone: true,
  imports: [],
  templateUrl: './imagecard.component.html',
  styleUrl: './imagecard.component.css',
})
export class ImagecardComponent {
  @Input() title!: string;
  @Input() photo!: string;
  @Input() subtitle!: string;
}
