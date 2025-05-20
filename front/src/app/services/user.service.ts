import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room, User, UserData } from '../interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'authToken';
  token: string | null = null;
  header: HttpHeaders = new HttpHeaders();
  public userData = new BehaviorSubject<User>({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    id: -1,
  });
  public userData$ = this.userData.asObservable();
  public userLogged = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = this.getToken();
      this.header = new HttpHeaders({ Authorization: `Token ${this.token}` });
    }
  }
  savedUser() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user) as User;
        this.userData.next(parsedUser);
        this.userLogged = true;
      }
    }
    return null;
  }

  getUser() {
    return this.userData$;
  }
  getUserData(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getCurrentUser`, {
      headers: this.getAuthHeaders(),
    });
  }
  getUserById(id: string) {
    return this.http.get<User>(`${this.apiUrl}/userById/${id}`);
  }
  getSelecetedUserFeed(userId: number) {
    return this.http.get<Room[]>(`${this.apiUrl}/selectedUserFeed/${userId}`);
  }
  updateUser(data: User) {
    this.userData.next(data);
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'register', userData);
  }
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl + '/login', credentials);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    } else {
      return false;
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Token ${token}`);
  }
  userGetter() {
    if (this.isAuthenticated()) {
      this.getUserData().subscribe((res: any) => {
        const user = res.user ? res.user : res;
        this.userData.next(user);
      });
    }
  }
}
