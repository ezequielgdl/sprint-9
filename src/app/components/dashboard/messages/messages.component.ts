import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';
import { Contact } from '../../../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  @Input()
  contacts: Contact[] = [];
  @Input()
  totalContacts: number | null = 0;
  @Output()
  offsetChange = new EventEmitter<number>();

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

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalContacts!) {
      this.currentPage++;
      this.emitOffset();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.emitOffset();
    }
  }

  emitOffset() {
    this.offsetChange.emit(this.currentPage * this.pageSize);
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
