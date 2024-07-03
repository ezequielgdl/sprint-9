import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';

@Component({
  selector: 'app-events-db',
  standalone: true,
  imports: [],
  templateUrl: './events-db.component.html',
  styleUrl: './events-db.component.css',
})
export class EventsDBComponent {
  @Input() events!: any[];
  @Input() category!: string;

  constructor(private supabaseService: SupabaseService) {}

  async onDelete(table: string, id: number) {
    try {
      await this.supabaseService.delete(table, id);
      await this.supabaseService.getEvents(this.category);
    } catch (error) {
      console.error('Error deleting member:');
      alert(error);
    }
  }
}
