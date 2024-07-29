import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  members: Member[] = [];
  trayectoria: any[] = [];
  noticias: any[] = [];
  actividades: any[] = [];
  contacts: Contact[] = [];
  totalContacts: number | null = 0;
  status: string = 'members';
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    this.members = await this.supabaseService.getMembers();
    this.trayectoria = await this.supabaseService.getEvents('trayectoria');
    this.noticias = await this.supabaseService.getEvents('noticias');
    this.actividades = await this.supabaseService.getEvents('actividades');
    this.contacts = await this.supabaseService.getContacts(0);
    this.totalContacts = await this.supabaseService.getTotalCount();
  }

  async onOffsetChange(offset: number) {
    this.contacts = await this.supabaseService.getContacts(offset);
  }

  async onSignOut() {
    await this.supabaseService.logout();
    this.router.navigate(['/login']);
  }

  onStatusChange(state: string) {
    this.status = state;
    this.fetchData();
  }

  onMemberCreated() {
    this.fetchData();
  }

  onEventCreated() {
    this.fetchData();
  }
}
