import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interface';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { TopicsComponent } from "../topics/topics.component";
import { ActivityComponent } from "../activity/activity.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, TopicsComponent, ActivityComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  rooms?: Observable<Room[]>;
  length = 0

  constructor(private apiService: ApiService,private userService:UserService) {}


  ngOnInit(): void {
    this.userService.savedUser()
    this.apiService.searchParam.subscribe(res=>{
      this.rooms = this.apiService.searchRooms(res)
    })
    this.apiService.topicName.subscribe(res=>{
      this.rooms = this.apiService.getRoomsByTopic(res)
    })

    
  }
}
