import { Component } from '@angular/core';
import { ImagecardComponent } from '../imagecard/imagecard.component';
import { SupabaseService } from '../../services/auth.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [ImagecardComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent {
  noticias: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.noticias = await this.supabaseService.getEvents('noticias');
  }
}
