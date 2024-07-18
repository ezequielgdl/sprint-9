import { Component } from '@angular/core';
import { Member } from '../../../interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../../../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SuccessComponent } from '../success/success.component';
import { MultiSelectComponent } from '../multiselect/multiselect.component';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessComponent, MultiSelectComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateMemberComponent {
  showSuccessModal: boolean = false;
  successMessage: string = '';
  id: string | null = null;
  data: any | null = null;
  selectedFile: File | null = null;
  updating: boolean = false;

  memberForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    avatar: new FormControl(null),
    role: new FormControl('', Validators.required),
    linkedin: new FormControl(''),
    category: new FormControl([]),
  });

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.fetchData(this.id);
    }
  }

  async fetchData(id: string) {
    this.data = await this.supabaseService.getById(id, 'members');
    if (this.data) {
      this.memberForm.patchValue({
        name: this.data[0].name,
        title: this.data[0].title,
        avatar: null,
        role: this.data[0].role,
        linkedin: this.data[0].linkedin,
        category: this.data[0].category,
      });
    }
  }

  async onSubmitUpdate() {
    if (this.memberForm.valid && this.id) {
      this.updating = true;
      const member: Member = this.memberForm.value as Member;
      member.avatar = this.data[0].avatar;
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
      await this.supabaseService.update(member, this.id, 'members');
      this.updating = false;
      this.successMessage = 'Miembro actualizado';
      this.showSuccessModal = true;
    }
  }

  onFileSelected(event: Event) {
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
