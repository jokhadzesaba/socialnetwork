import { Component, OnInit } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { TopicsComponent } from "../topics/topics.component";
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserData } from '../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FeedComponent, TopicsComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService){}
  public user?:Observable<UserData>
  
  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      console.log(res);
      
    })
  }

}
