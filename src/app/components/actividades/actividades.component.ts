import { Component } from '@angular/core';
import { ImagecardComponent } from '../imagecard/imagecard.component';
import { SupabaseService } from '../../services/auth.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [ImagecardComponent],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
})
export class ActividadesComponent {
  actividades: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.actividades = await this.supabaseService.getEvents('actividades');
  }
}
