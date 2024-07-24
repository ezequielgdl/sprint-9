import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events-db',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './events-db.component.html',
  styleUrl: './events-db.component.css',
})
export class EventsDBComponent {
  @Input() events!: any[];
  @Input() category!: string;
  order: boolean = true;
  searchTerm: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async onDelete(table: string, id: number, bucket: string, column: string) {
    try {
      await this.supabaseService.delete(table, id, bucket, column);
      this.events = await this.supabaseService.getEvents(this.category);
    } catch (error) {
      console.error('Error deleting member:');
    }
  }

  onUpdate(id: string) {
    this.router.navigate(['dashboard/event', id]);
  }

  sort(column: string) {
    this.order = !this.order;
    return this.events.sort((a, b) => {
      if (typeof a[column] === 'string' && typeof b[column] === 'string') {
        return this.order
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      } else {
        return this.order ? a[column] - b[column] : b[column] - a[column];
      }
    });
  }

  search() {
    this.sort('date');
    if (!this.searchTerm.trim()) {
      return this.events;
    }
    return this.events.filter((event) =>
      event.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
