import { Component, Input } from '@angular/core';
import { SupabaseService } from '../../../services/auth.service';
import { Contact } from '../../../interface';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  @Input()
  contacts!: Contact[];
  selectedContactId: number | null = null;
}
