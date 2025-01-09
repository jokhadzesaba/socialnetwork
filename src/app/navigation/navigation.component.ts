import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserData } from '../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{

  public userData!:Observable<UserData>

  showSettings = false
  constructor(private userervice:UserService){}


  ngOnInit(): void {
    this.userData = this.userervice.getUser()
  }
  settingsButtons(){
    this.showSettings = !this.showSettings
    console.log(this.showSettings);
    
  }
}
