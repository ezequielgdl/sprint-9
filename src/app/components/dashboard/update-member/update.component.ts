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

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateMemberComponent {
  id: string | null = null;
  data: any | null = null;

  memberForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    avatar: new FormControl(''),
    role: new FormControl('', Validators.required),
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
    this.data = await this.supabaseService.getById(this.id!, 'members');
    console.log(this.data);
    if (this.data) {
      this.memberForm.patchValue({
        name: this.data[0].name,
        title: this.data[0].title,
        avatar: this.data[0].avatar,
        role: this.data[0].role,
      });
    }
  }

  async onSubmitUpdate() {
    if (this.memberForm.valid && this.id) {
      const member: Member = this.memberForm.value as Member;
      await this.supabaseService.update(member, this.id, 'members');
    }
    this.router.navigate(['dashboard']);
  }

  navigateBack() {
    this.router.navigate(['dashboard']);
  }
}
