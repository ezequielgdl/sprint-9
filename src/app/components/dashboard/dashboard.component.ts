import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  members: any[] = [];
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.members = await this.supabaseService.getMembers();
    console.log(this.members);
  }

  async onSignOut() {
    await this.supabaseService.logout();
    this.router.navigate(['/login']);
  }
}
