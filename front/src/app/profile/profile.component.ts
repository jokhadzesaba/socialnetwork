import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { TopicsComponent } from '../topics/topics.component';
import { UserService } from '../services/user.service';
import { Observable, tap } from 'rxjs';
import { User, UserData } from '../interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FeedComponent, TopicsComponent, CommonModule, ActivityComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  public user?: Observable<User>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.user = this.userService.getUserById(id).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
}
