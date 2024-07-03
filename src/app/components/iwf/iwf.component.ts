import { Component } from '@angular/core';
import { Member } from '../../interface';
import { SupabaseService } from '../../services/auth.service';

@Component({
  selector: 'app-iwf',
  standalone: true,
  imports: [],
  templateUrl: './iwf.component.html',
  styleUrl: './iwf.component.css',
})
export class IwfComponent {
  members: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.members = await this.supabaseService.getMembers();
  }
}
