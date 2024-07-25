import { Component } from '@angular/core';
import { SupabaseService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MultiSelectComponent } from '../../components/dashboard/multiselect/multiselect.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-socias',
  standalone: true,
  imports: [
    FormsModule,
    LoadingComponent,
    NgOptimizedImage,
    MultiSelectComponent,
  ],
  templateUrl: './socias.component.html',
  styleUrl: './socias.component.css',
})
export class SociasComponent {
  members: any[] = [];
  searchTerm: string[] = [];
  isLoading: boolean = true;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.members = await this.supabaseService.getMembers();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  search() {
    if (!this.searchTerm || this.searchTerm.length === 0) {
      return this.members;
    }
    return this.members.filter(
      (member) =>
        member.category &&
        member.category.some((cat: string) =>
          this.searchTerm.some((term: string) =>
            cat.toLowerCase().includes(term.toLowerCase())
          )
        )
    );
  }
}
