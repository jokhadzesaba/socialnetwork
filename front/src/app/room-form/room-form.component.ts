import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserData } from '../interface';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent {
  public user?:Observable<UserData>
  public roomForm:FormGroup
  
  constructor(private fb:FormBuilder,private apiService:ApiService,private userService:UserService,private router:Router){
     this.roomForm = this.fb.group(
      {
        roomPhoto:[''],
        roomTopic: ['', [Validators.required,]],
        roomName: ['', [Validators.required]],
        roomDescription: ['', [Validators.required]],
      },
    );
  }
  
  onSubmit() {
    if (this.userService.userLogged) {
      const formData = new FormData();
      formData.append('roomTopic', this.roomForm.value.roomTopic);
      formData.append('roomName', this.roomForm.value.roomName);
      formData.append('roomDescription', this.roomForm.value.roomDescription);
  
      const fileInput = (document.querySelector('input[type="file"]') as HTMLInputElement);
      if (fileInput.files && fileInput.files.length > 0) {
        formData.append('roomPhoto', fileInput.files[0]); // Append file
      }
  
      this.apiService.createRoom(formData).subscribe(() => {
        this.roomForm.reset();
        this.router.navigate(['/feed']);
      });
    } else {
      this.router.navigate(['/login_registrate']);
    }
  }
  
}
