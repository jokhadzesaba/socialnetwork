import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, tap } from 'rxjs';
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
  public topics!:Observable<TopicWithCount[]>
  public countAll = 0
  constructor(private apiService:ApiService){
  }
  ngOnInit(): void {
    this.topics = this.apiService.getTopics().pipe(tap((res:TopicWithCount[])=>{
      this.countAll = 0
      res.forEach(x => this.countAll+=x.count)
    }))
  }
  filterBytopic(topicName:string){
      this.apiService.topicName.next(topicName)
      this.apiService.activityParam.next(topicName)
  }
}
