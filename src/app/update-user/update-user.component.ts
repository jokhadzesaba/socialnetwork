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
import { Router } from '@angular/router';

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
    private apiService:ApiService,
    private router:Router
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
      .subscribe(()=>{
        this.cdr.detectChanges()
      });
  }
  changeImg(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.updateForm?.patchValue({ img: file });
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imgPreview = document.getElementById('img-preview') as HTMLImageElement;
        if (imgPreview) {
          imgPreview.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  update(){
    const formValues = this.updateForm?.getRawValue();
    const data :UserWithoutId= {name:formValues.name,email:formValues.email,bio:formValues.bio,avatar:formValues.img}    
    this.router.navigate(['/deletePage'], { 
      queryParams: { data: data, message: 'Profile?' } 
    });
    this.apiService.updateUser(data).subscribe()    

  }
}
