import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [FormsModule, LoadingComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent {
  members: any[] = [];
  order: boolean = true;
  searchTerm: string = '';
  loading: boolean = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.members = await this.supabaseService.getMembers();
  }

  async onDelete(table: string, id: number, bucket: string, column: string) {
    try {
      this.loading = true;
      await this.supabaseService.delete(table, id, bucket, column);
      this.members = await this.supabaseService.getMembers();
    } catch (error) {
      console.error('Error deleting member:');
    } finally {
      this.loading = false;
    }
  }

  onUpdate(id: string) {
    this.router.navigate(['dashboard/member', id]);
  }

  sort(column: string) {
    this.order = !this.order;
    return this.members.sort((a, b) => {
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
    if (!this.searchTerm.trim()) {
      return this.members;
    }
    return this.members.filter((member) =>
      member.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
