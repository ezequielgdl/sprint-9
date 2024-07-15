import { Component } from '@angular/core';
import { SupabaseService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [LoadingComponent, RouterLink],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
})
export class EventoComponent {
  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}
  id: string | null = null;
  data: any | null = null;
  isLoading = true;

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      if (this.id) {
        try {
          this.data = await this.supabaseService.getById(this.id, 'events');
        } catch (error) {
          console.error('Error fetching event data', error);
        } finally {
          this.isLoading = false;
        }
      } else {
        this.isLoading = false;
      }
    });
  }
}
