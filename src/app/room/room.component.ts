import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map, Observable } from 'rxjs';
import { Room, User } from '../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {
  public roomData?: Observable<Room>;
  public participants?: Observable<User[]>;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.roomData = this.apiService.getRoomById('4');
    this.participants = this.apiService.getRoomById('4').pipe(
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
}
