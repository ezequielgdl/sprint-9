import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { EventsDBComponent } from '../events-db/events-db.component';
import { Evento } from '../../../interface';

@Component({
  selector: 'app-noticias-db',
  standalone: true,
  imports: [EventsDBComponent],
  templateUrl: './noticias-db.component.html',
  styleUrl: './noticias-db.component.css',
})
export class NoticiasDbComponent {
  noticias: Evento[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.noticias = await this.supabaseService.getEvents('noticias');
  }
}
