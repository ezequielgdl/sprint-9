import { Component } from '@angular/core';
import { SupabaseService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from '../../components/dashboard/multiselect/multiselect.component';

@Component({
  selector: 'app-socias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './socias.component.html',
  styleUrl: './socias.component.css',
})
export class SociasComponent {
  members: any[] = [];
  searchTerm: string = '';

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.members = await this.supabaseService.getMembers();
  }

  search() {
    if (!this.searchTerm.trim()) {
      return this.members;
    }
    return this.members.filter(
      (member) =>
        member.category &&
        member.category.some((cat: string) =>
          cat.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
    );
  }
}
