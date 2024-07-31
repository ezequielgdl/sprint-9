import { Component } from '@angular/core';
import { EventsDBComponent } from '../events-db/events-db.component';
import { SupabaseService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Evento } from '../../../interface';

@Component({
  selector: 'app-trayectoria-db',
  standalone: true,
  imports: [EventsDBComponent],
  templateUrl: './trayectoria-db.component.html',
  styleUrl: './trayectoria-db.component.css',
})
export class TrayectoriaDbComponent {
  trayectoria: Evento[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.trayectoria = await this.supabaseService.getEvents('trayectoria');
  }
}
