import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';
import { Contact } from '../../../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  contacts: Contact[] = [];
  totalContacts: number | null = 0;

  currentPage = 0;
  pageSize = 10;

  selectedContactId: number | null = null;

  get startIndex(): number {
    return this.currentPage * this.pageSize + 1;
  }

  get endIndex(): number {
    const end = (this.currentPage + 1) * this.pageSize;
    return end > (this.totalContacts || 0) ? this.totalContacts! : end;
  }

  get totalPages(): number {
    return this.totalContacts
      ? Math.ceil(this.totalContacts / this.pageSize)
      : 0;
  }

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.totalContacts = await this.supabaseService.getTotalCount();
    this.loadContacts();
  }

  async loadContacts() {
    const offset = this.currentPage * this.pageSize;
    this.contacts = await this.supabaseService.getContacts(offset);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalContacts!) {
      this.currentPage++;
      this.loadContacts();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadContacts();
    }
  }

  async onRead(id: string | undefined) {
    const updatedData = await this.supabaseService.toggleViewed(id);
    if (updatedData) {
      this.contacts = this.contacts.map((contact) =>
        contact.id === id ? { ...contact, viewed: !contact.viewed } : contact
      );
    }
  }
}
