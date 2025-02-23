import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room, User, UserData } from '../interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  token: string | null = null;
  header: HttpHeaders = new HttpHeaders();
  public userData = new BehaviorSubject<UserData>({
    token: '',
    user: { name: '', email: '', bio: '', avatar: '', id: -1 },
  });
  public userData$ = this.userData.asObservable();
  public userLogged = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
      this.header = new HttpHeaders({ Authorization: `Token ${this.token}` });
    }
  }
  savedUser() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        this.userData.next(parsedUser);
        this.userLogged = true;
      }
    }
  }
  getUser() {
    return this.userData$;
  }
  getUserById(id: string) {
    return this.http.get<User>(`${this.apiUrl}/userById/${id}`);
  }
  getSelecetedUserFeed(userId: number) {
    return this.http.get<Room[]>(`${this.apiUrl}/selectedUserFeed/${userId}`);
  }
  updateUser(data: UserData) {
    this.userData.next(data);
  }
}
