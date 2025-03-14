import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { take, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { User, UserWithoutId } from '../interface';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserComponent implements OnInit {
  updateForm?: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private apiService:ApiService
  ) {}
  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(
        tap((res) => {
          this.updateForm = this.fb.group({
            name: [res.name, Validators.required],
            email: [res.email, [Validators.required, Validators.email]],
            bio: [res.bio, Validators.required],
            img: [res.avatar, Validators.required],
          });
        })
      )
      .subscribe();
  }
  // Handle image change
  changeImg(): void {
    const fileInput = (document.querySelector('input[type="file"]') as HTMLInputElement);
    if (fileInput.files && fileInput.files.length > 0) {
      this.updateForm?.patchValue({'img':fileInput.files[0]});
      this.cdr.detectChanges()
    }
  } 
  update(){
    const formValues = this.updateForm?.getRawValue();
    const data :UserWithoutId= {name:formValues.name,email:formValues.email,bio:formValues.bio,avatar:formValues.img}
    this.apiService.updateUser(data).subscribe()    

  }
}
