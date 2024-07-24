import { Component, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/auth.service';
import { Contact } from '../../interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private supabaseService: SupabaseService) {}
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(0),
    message: new FormControl('', Validators.required),
    viewed: new FormControl(false),
  });

  async onSubmit() {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value as Contact;
      const response = await this.supabaseService.createContact(contact);
      console.log(response);
      return response;
    }
    return;
  }
}
