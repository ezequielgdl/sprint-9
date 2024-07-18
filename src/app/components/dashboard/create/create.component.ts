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
import { CommonModule } from '@angular/common';
import {
  ClassicEditor,
  AccessibilityHelp,
  AutoImage,
  Autosave,
  Bold,
  Essentials,
  FontColor,
  GeneralHtmlSupport,
  ImageBlock,
  ImageInsertViaUrl,
  ImageToolbar,
  Italic,
  Link,
  List,
  Paragraph,
  SelectAll,
  Underline,
  Undo,
  EditorConfig,
} from 'ckeditor5';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import 'ckeditor5/ckeditor5.css';
import { MultiSelectComponent } from '../multiselect/multiselect.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SuccessComponent,
    CommonModule,
    CKEditorModule,
    MultiSelectComponent,
  ],
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
  submitted: boolean = false;
  mode: boolean = true;

  public Editor = ClassicEditor;
  public editorConfig: EditorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'selectAll',
        '|',
        'fontColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImageViaUrl',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      AutoImage,
      Autosave,
      Bold,
      Essentials,
      FontColor,
      GeneralHtmlSupport,
      ImageBlock,
      ImageInsertViaUrl,
      ImageToolbar,
      Italic,
      Link,
      List,
      Paragraph,
      SelectAll,
      Underline,
      Undo,
    ],
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: ['imageTextAlternative'],
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
  };

  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl(''),
    year: new FormControl(2024, Validators.required),
    description: new FormControl('', Validators.required),
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
