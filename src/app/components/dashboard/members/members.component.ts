import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async onDelete(table: string, id: number) {
    try {
      await this.supabaseService.delete(table, id);
      this.members = await this.supabaseService.getMembers();
    } catch (error) {
      console.error('Error deleting member:');
      alert(error);
    }
  }

  onUpdate(id: string) {
    this.router.navigate(['dashboard/member', id]);
  }
}
