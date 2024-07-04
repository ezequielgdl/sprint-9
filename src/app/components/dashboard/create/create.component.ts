import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../../services/auth.service';
import { Member } from '../../../interface';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  @Output() memberCreated = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<void>();
  constructor(private supabaseService: SupabaseService) {}
  showSuccessModal: boolean = false;
  successMessage: string = '';

  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl(''),
    year: new FormControl(2024, Validators.required),
    description: new FormControl('', Validators.required),
    url: new FormControl(''),
    picture: new FormControl('https://placehold.co/600x400/orange/white'),
    category: new FormControl('', Validators.required),
  });
  memberForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    avatar: new FormControl(''),
    role: new FormControl('', Validators.required),
  });

  async onSubmitMember() {
    if (this.memberForm.valid) {
      const member: Member = this.memberForm.value as Member;
      await this.supabaseService.createMember(member);
      this.successMessage = 'Miembro agregado con éxito';
      this.showSuccessModal = true;
      this.memberForm.reset();
      this.memberCreated.emit();
    }
  }

  async onSubmitEvent() {
    if (this.eventForm.valid) {
      const event: Event = this.eventForm.value as Event;
      await this.supabaseService.createEvent(event);
      this.successMessage = 'Evento agregado con éxito';
      this.showSuccessModal = true;
      this.eventForm.reset();
      this.eventCreated.emit();
    }
  }
}
