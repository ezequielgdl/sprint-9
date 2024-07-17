import { Component } from '@angular/core';
import { ImagecardComponent } from '../../components/imagecard/imagecard.component';
import { SupabaseService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [ImagecardComponent, LoadingComponent],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css',
})
export class ActividadesComponent {
  actividades: any[] = [];
  isLoading = true;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.actividades = await this.supabaseService.getEvents('actividades');
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  onNavigate(id: string) {
    this.router.navigate(['evento', id]);
  }
}
