import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Topic, TopicWithCount } from '../interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
})
export class TopicsComponent implements OnInit {
  public topics!: Observable<TopicWithCount[]>;
  public countAll = 0;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.topics = this.apiService.getTopics().pipe(
      tap((res: TopicWithCount[]) => {
        this.countAll = 0;
        res.forEach((x) => (this.countAll += x.count));
        res = res.sort((a, b) => b.count - a.count);
      })
    );
  }
  filterBytopic(topicName: string) {
    this.apiService.topicName.next(topicName);
    this.apiService.activityParam.next(topicName);
  }
}
