import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Topic, TopicWithCount } from '../interface';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent implements OnInit{
  topics!:Observable<TopicWithCount[]>
  constructor(private apiService:ApiService){
  }
  ngOnInit(): void {
    this.topics = this.apiService.getTopics()
  }
}
