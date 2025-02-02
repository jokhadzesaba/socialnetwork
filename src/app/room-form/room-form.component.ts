import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent {

  public roomForm:FormGroup
  
  constructor(private fb:FormBuilder,private apiService:ApiService){
     this.roomForm = this.fb.group(
      {
        roomTopic: ['', [Validators.required,]],
        roomName: ['', [Validators.required]],
        roomDescription: ['', [Validators.required]],
      },
    );
  }
  
  onSubmit() {
    const {roomTopic,roomName,roomDescription } = this.roomForm.value
    this.apiService.createRoom(roomTopic,roomName,roomDescription).subscribe()
    
    }
}
