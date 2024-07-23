import { Component } from '@angular/core';
import { SupabaseService } from '../../services/auth.service';

@Component({
  selector: 'app-socias',
  standalone: true,
  imports: [],
  templateUrl: './socias.component.html',
  styleUrl: './socias.component.css',
})
export class SociasComponent {
  members: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.members = await this.supabaseService.getMembers();
  }
}
