import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../../services/auth.service';
import { SuccessComponent } from '../success/success.component';
import { Evento } from '../../../interface';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessComponent],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css',
})
export class UpdateEventComponent {
  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}
  showSuccessModal: boolean = false;
  successMessage: string = '';
  id: string | null = null;
  data: any | null = null;
  selectedFile: File | null = null;
  updating: boolean = false;

  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl(''),
    year: new FormControl(2024, Validators.required),
    description: new FormControl('', Validators.required),
    url: new FormControl(''),
    picture: new FormControl('https://placehold.co/600x400/orange/white'),
    category: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.fetchData(this.id);
    }
  }

  async fetchData(id: string) {
    this.data = await this.supabaseService.getById(id, 'events');
    if (this.data && this.data.length > 0) {
      this.eventForm.patchValue({
        title: this.data[0].title,
        subtitle: this.data[0].subtitle,
        year: this.data[0].year,
        description: this.data[0].description,
        url: this.data[0].url,
        picture: null,
        category: this.data[0].category,
      });
    }
  }

  async onSubmitEvent() {
    console.log('Attempting...');
    if (this.eventForm.valid && this.id) {
      this.updating = true;
      const event: Evento = {
        ...this.eventForm.value,
        description: this.eventForm.value.description!.replace(/\n/g, '<br/>'),
      } as Evento;
      event.picture = this.data[0].avatar;
      if (this.selectedFile) {
        const fileName = `${new Date().getTime()}_${this.selectedFile.name}`;
        const { data, error } = await this.supabaseService.uploadImage(
          fileName,
          this.selectedFile,
          'events'
        );
        if (error) {
          console.error('File upload error:', error);
          return;
        }
        event.picture = data;
      }
      await this.supabaseService.update(event, this.id, 'events');
      this.successMessage = 'Evento actualizado';
      this.showSuccessModal = true;
    }
  }

  onEventFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onModalClose() {
    this.showSuccessModal = false;
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['dashboard']);
  }
}
