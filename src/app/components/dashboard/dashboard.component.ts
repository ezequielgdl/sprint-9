import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SupabaseService } from '../../services/auth.service';
import { MembersComponent } from './members/members.component';
import { EventsDBComponent } from './events-db/events-db.component';
import { Contact, Member } from '../../interface';
import { CreateComponent } from './create/create.component';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MembersComponent,
    EventsDBComponent,
    CreateComponent,
    CommonModule,
    MessagesComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async onSignOut() {
    await this.supabaseService.logout();
    this.router.navigate(['/login']);
  }
}
