import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserData } from '../interface';
import { LocalStorageService } from './local-storage.service';
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
    user: { name: '', email: '', bio: '', avatar: '' },
  });
  public userData$ = this.userData.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
      this.header = new HttpHeaders({ Authorization: `Token ${this.token}` });
    }
  }

  getUser() {
    return this.userData$;
  }
  updateUser(data:UserData){
    this.userData.next(data)
  }
}
