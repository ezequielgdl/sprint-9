import { Component } from '@angular/core';
import { ImagecardComponent } from '../../components/imagecard/imagecard.component';
import { SupabaseService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [ImagecardComponent, LoadingComponent],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css',
})
export class NoticiasComponent {
  noticias: any[] = [];
  isLoading = true;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.noticias = await this.supabaseService.getEvents('noticias');
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
