import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Activity } from '../interface';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent implements OnInit {
  public activities?: Observable<Activity[]>;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.activityParam.subscribe((res) => {
      this.activities = this.apiService.getActivity(res);
    });
  }
}
