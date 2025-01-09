import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

const passwordMatchValidator: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  return password && confirmPassword && password !== confirmPassword
    ? { passwordsMismatch: true }
    : null;
};

@Component({
  selector: 'app-login-registrate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './login-registrate.component.html',
  styleUrl: './login-registrate.component.scss',
})
export class LoginRegistrateComponent implements OnInit {
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  public formFields: string[] = [
    'username',
    'email',
    'password',
    'repeatPassword',
  ];
  login = false;
  public email = ''
  public password = ''

  constructor(private fb: FormBuilder, private authService: AuthService,private userService:UserService,private localStorage:LocalStorageService,) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        username: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
    );  
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, username } = this.registerForm.value;
      this.authService.register({ email, password, username }).subscribe(
        () => {
          alert('Registration successful!');
          this.registerForm.reset();
        },
        () => {
          alert(
            'Registration failed. Please check your details and try again.'
          );
        }
      );
    } else {
      alert('Form is invalid. Please fill in all required fields correctly.');
    }
  }
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUser({ email, password }).subscribe(
        (res) => {
          alert('Login Successful');
          this.loginForm.reset();
          this.localStorage.setItem('user',res)
          this.userService.updateUser(res)
        },
        () => {
          alert('Login Failed');
        }
      );
    } else {
      alert('Form is invalid. Please fill in all required fields correctly.');
    }
  }
  changeForm() {
    this.login = !this.login;
  }
}
