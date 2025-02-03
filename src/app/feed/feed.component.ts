import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interface';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  rooms?: Observable<Room[]>;

  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.apiService.topicName.subscribe(res=>{
      this.rooms = this.apiService.getRoomsByTopic(res)
    })
    // this.rooms = this.apiService.getRoomsByTopic(this.apiService.topicName.value)
  }
}
