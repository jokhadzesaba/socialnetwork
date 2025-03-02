import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, tap } from 'rxjs';
import { Topic, TopicWithCount } from '../interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-topics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-topics.component.html',
  styleUrl: './search-topics.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchTopicsComponent implements OnInit {
  public topics?: Observable<TopicWithCount[]>;
  public countAll = 0;
  constructor(private apiService: ApiService,private router:Router) {}
  ngOnInit(): void {
    this.topics = this.apiService.getTopics().pipe(
      tap((res: TopicWithCount[]) => {
        this.countAll = 0;
        res.forEach((x) => (this.countAll += x.count));
        res = res.sort((a, b) => b.count - a.count);
      })
    );
  }
  searchTopic(searchParam:string){
    this.apiService.topicName.next(searchParam)
    this.apiService.activityParam.next(searchParam)
    this.router.navigate(['/feed'])
  }
}
