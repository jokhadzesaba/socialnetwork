import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map, Observable } from 'rxjs';
import { Room, User, UserData } from '../interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {
  public roomData?: Observable<Room>;
  public participants?: Observable<User[]>;
  public roomId!: string; 
  public message = "";
  public userData!: Observable<UserData>;
  constructor(private apiService: ApiService,private route:ActivatedRoute,private userService:UserService) {}
  ngOnInit(): void {
    this.getRoomInfo()
    this.userService.savedUser();
    this.userData = this.userService.getUser();
  }

  getRoomInfo(){
    this.roomId = this.route.snapshot.paramMap.get('id')!
    this.roomData = this.apiService.getRoomById(this.roomId);
    this.participants = this.apiService.getRoomById(this.roomId).pipe(
      map((res) => {
        const participants: User[] = [];
        const seenEmails = new Set<string>();
        for (let i of res.messages) {
          if (!seenEmails.has(i.user.email)) {
            seenEmails.add(i.user.email);
            participants.push(i.user);
          }
        }
        return participants;
      })
    );
  }
  postMessage(){
    console.log('request sent');
    
    this.apiService.postMessage(this.message,this.roomId).subscribe(()=>{
      this.getRoomInfo()
    })
  }
}
