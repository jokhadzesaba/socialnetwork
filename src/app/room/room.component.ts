import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Room, User, UserData } from '../interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { WebSocketService } from '../services/web-socket.service';
import { TopicsComponent } from "../topics/topics.component";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {

  public roomData?: Observable<Room>;
  public participants?: Observable<User[]>;
  public roomId!: string;
  public message = '';
  public userData!: Observable<UserData>;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private webSocketService: WebSocketService
  ) {}
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getRoomInfo();
    this.userService.savedUser();
    this.userData = this.userService.getUser();
    window.scrollTo(0, 0);

    this.webSocketService
      .getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        if (this.roomData) {
          this.roomData = this.roomData.pipe(
            tap((room) => ({
              ...room,
              messages: [...room.messages, message],
            }))
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getRoomInfo() {
    this.roomId = this.route.snapshot.paramMap.get('id')!;
    this.webSocketService.connect(this.roomId);
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
  postMessage() {
    if (this.message.trim() === '') return; // Ignore empty messages
    this.userData.subscribe((user) => {
      if (user) {
        const messageData = {
          message: this.message,
          email: user.user.email,
        };
        console.log('Sending message:', messageData);
        this.webSocketService.sendMessage(messageData);
        this.message = ''; // Clear input
      }
    });
  }
}
