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
    this.data = await this.supabaseService.getById(this.id!, 'events');
    console.log(this.data);
    if (this.data && this.data.length > 0) {
      this.eventForm.patchValue({
        title: this.data[0].title,
        subtitle: this.data[0].subtitle,
        year: this.data[0].year,
        description: this.data[0].description,
        url: this.data[0].url,
        picture: this.data[0].picture,
        category: this.data[0].category,
      });
    }
  }

  async onSubmitEvent() {
    console.log('Attempting...');
    if (this.eventForm.valid && this.id) {
      const event: Event = this.eventForm.value as Event;
      await this.supabaseService.update(event, this.id, 'events');
      this.successMessage = 'Evento actualizado';
      this.showSuccessModal = true;
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
