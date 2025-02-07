import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserData } from '../interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  public userData!: Observable<UserData>;
  public searchParam = '';
  showSettings = false;
  constructor(
    private userervice: UserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userData = this.userervice.getUser();
  }
  settingsButtons() {
    this.showSettings = !this.showSettings;
    console.log(this.showSettings);
  }
  homePage() {
    this.apiService.topicName.next('All');
    this.apiService.activityParam.next('All');
  }
  searchRooms() {
    if (this.searchParam) {
      this.apiService.searchParam.next(this.searchParam);
      this.apiService.activityParam.next(this.searchParam);
      this.searchParam = '';
    }
  }
}
