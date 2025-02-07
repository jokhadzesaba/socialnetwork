import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserData } from '../interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent {
  public user?:Observable<UserData>
  public roomForm:FormGroup
  
  constructor(private fb:FormBuilder,private apiService:ApiService,private userService:UserService,private router:Router){
     this.roomForm = this.fb.group(
      {
        roomTopic: ['', [Validators.required,]],
        roomName: ['', [Validators.required]],
        roomDescription: ['', [Validators.required]],
      },
    );
  }
  
  onSubmit() {
    if (this.userService.userLogged) {
      const {roomTopic,roomName,roomDescription } = this.roomForm.value
      this.apiService.createRoom(roomTopic,roomName,roomDescription).subscribe()
      this.roomForm.reset()
      this.router.navigate(['/feed'])
    }else{
      this.router.navigate(['/login_registrate'])
    }
    
    }
}
