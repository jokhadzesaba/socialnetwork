import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { ActivityComponent } from './activity/activity.component';
import { TopicsComponent } from './topics/topics.component';
import { FeedComponent } from './feed/feed.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { User, UserData } from './interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'socialNetworkApp';
  
}
