import { Component, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/auth.service';
import { Contact } from '../../interface';
import { SuccessComponent } from '../dashboard/success/success.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  creating: boolean = false;
  submitted: boolean = false;
  showSuccessModal: boolean = false;

  constructor(private supabaseService: SupabaseService) {}
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(0),
    message: new FormControl('', Validators.required),
    viewed: new FormControl(false),
  });

  async onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.creating = true;
      const contact: Contact = this.contactForm.value as Contact;
      await this.supabaseService.createContact(contact);
      this.contactForm.reset();
    } else {
    }
    this.creating = false;
    this.submitted = false;
    this.showSuccessModal = true;
  }
}
