import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserData } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'register', userData);
  }
  loginUser(credentials: { email: string; password: string }): Observable<UserData> {
    return this.http.post<UserData>(this.apiUrl + 'login', credentials);
  }

  
}
