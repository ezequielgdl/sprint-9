import {
  Component,
  EventEmitter,
  Output,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../../services/auth.service';
import { Member, Evento } from '../../../interface';
import { SuccessComponent } from '../success/success.component';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { MultiSelectComponent } from '../multiselect/multiselect.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SuccessComponent,
    CommonModule,
    QuillModule,
    MultiSelectComponent,
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements AfterViewInit, AfterViewChecked {
  @Output() memberCreated = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<void>();

  mode: boolean = false;
  showSuccessModal: boolean = false;
  successMessage: string = '';
  selectedFile: File | null = null;
  selectedEventFile: File | null = null;
  creating: boolean = false;
  submitted: boolean = false;

  constructor(
    private supabaseService: SupabaseService,
    private cdRef: ChangeDetectorRef
  ) {}

  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl(''),
    date: new FormControl('', Validators.required),
    description: new FormControl(''), // Initialize with an empty string
    picture: new FormControl('/iwf-screenshot.webp'),
    category: new FormControl('', Validators.required),
  });

  memberForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    avatar: new FormControl(''),
    role: new FormControl('', Validators.required),
    linkedin: new FormControl(''),
    category: new FormControl([]),
  });

  ngAfterViewInit() {
    this.cdRef.detectChanges(); // Ensure change detection after the view has been initialized
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onToggleMode(newMode: boolean) {
    this.mode = newMode;
    if (this.mode) {
      setTimeout(() => {
        this.cdRef.detectChanges();
      }, 0);
    }
  }

  async onSubmitMember() {
    this.submitted = true;
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
      this.submitted = false;
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
    this.submitted = true;
    if (this.eventForm.valid) {
      this.creating = true;
      const event: Evento = {
        ...this.eventForm.value,
        description: this.eventForm.value.description!.replace(/\n/g, '<br>'),
      } as Evento;
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
      this.submitted = true;
      this.successMessage = 'Evento agregado con éxito';
      this.showSuccessModal = true;
      this.eventForm.reset();
      this.eventCreated.emit();
    }
  }
}
