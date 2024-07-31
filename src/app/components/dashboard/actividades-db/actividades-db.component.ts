import { Component } from '@angular/core';
import { EventsDBComponent } from '../events-db/events-db.component';
import { SupabaseService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Evento } from '../../../interface';

@Component({
  selector: 'app-actividades-db',
  standalone: true,
  imports: [EventsDBComponent],
  templateUrl: './actividades-db.component.html',
  styleUrl: './actividades-db.component.css',
})
export class ActividadesDbComponent {
  actividades: Evento[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.actividades = await this.supabaseService.getEvents('actividades');
  }
}
