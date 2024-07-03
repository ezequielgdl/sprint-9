import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent {
  @Input()
  members!: any[];

  constructor(private supabaseService: SupabaseService) {}

  async onDelete(table: string, id: number) {
    try {
      await this.supabaseService.delete(table, id);
      this.members = await this.supabaseService.getMembers();
    } catch (error) {
      console.error('Error deleting member:');
      alert(error);
    }
  }
}
