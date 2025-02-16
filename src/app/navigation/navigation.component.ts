import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  public userData!: Observable<UserData>;
  public searchParam = '';
  showSettings = false;
  constructor(
    private userervice: UserService,
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userervice.savedUser()
    this.userData = this.userervice.getUser();
  }
  settingsButtons() {
    this.showSettings = !this.showSettings;
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
  logOut() {
    this.userervice.userData.next({
      token: '',
      user: { name: '', email: '', bio: '', avatar: '' },
    });
    this.userervice.userLogged = false;
    localStorage.removeItem('user');
    this.showSettings = false;
    this.cd.detectChanges();
  }
}
