import { Component } from '@angular/core';
import { SupabaseService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-trayectoria',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './trayectoria.component.html',
  styleUrl: './trayectoria.component.css',
})
export class TrayectoriaComponent {
  eventos: any[] = [];
  isLoading = true;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.eventos = await this.supabaseService.getEvents('trayectoria');
      this.eventos.sort(
        (a, b) => a.date.substring(0, 4) - b.date.substring(0, 4)
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
