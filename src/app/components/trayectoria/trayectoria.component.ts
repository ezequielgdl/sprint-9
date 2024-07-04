import { Component } from '@angular/core';
import { SupabaseService } from '../../services/auth.service';

@Component({
  selector: 'app-trayectoria',
  standalone: true,
  imports: [],
  templateUrl: './trayectoria.component.html',
  styleUrl: './trayectoria.component.css',
})
export class TrayectoriaComponent {
  eventos: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.eventos = await this.supabaseService.getEvents('trayectoria');
  }
}
