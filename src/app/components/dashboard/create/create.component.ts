import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../../services/auth.service';
import { Member, Evento } from '../../../interface';
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
  selectedFile: File | null = null;
  selectedEventFile: File | null = null;
  creating: boolean = false;

  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl(''),
    year: new FormControl(2024, Validators.required),
    description: new FormControl('', Validators.required),
    url: new FormControl(''),
    picture: new FormControl(null),
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
      this.creating = true;
      const member: Member = this.memberForm.value as Member;
      if (this.selectedFile) {
        const fileName = `${new Date().getTime()}_${this.selectedFile.name}`;
        const { data, error } = await this.supabaseService.uploadImage(
          fileName,
          this.selectedFile,
          'avatars'
        );

        if (error) {
          console.error('File upload error:', error);
          return;
        }
        member.avatar = data;
      }
      await this.supabaseService.createMember(member);
      this.creating = false;
      this.successMessage = 'Miembro agregado con éxito';
      this.showSuccessModal = true;
      this.memberForm.reset();
      this.memberCreated.emit();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onEventFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedEventFile = input.files[0];
    }
  }

  async onSubmitEvent() {
    if (this.eventForm.valid) {
      this.creating = true;
      const event: Evento = this.eventForm.value as Evento;
      if (this.selectedEventFile) {
        const fileName = `${new Date().getTime()}_${
          this.selectedEventFile.name
        }`;
        const { data, error } = await this.supabaseService.uploadImage(
          fileName,
          this.selectedEventFile,
          'events'
        );

        if (error) {
          console.error('File upload error:', error);
          return;
        }
        event.picture = data;
      }
      await this.supabaseService.createEvent(event);
      this.creating = false;
      this.successMessage = 'Evento agregado con éxito';
      this.showSuccessModal = true;
      this.eventForm.reset();
      this.eventCreated.emit();
    }
  }
}
