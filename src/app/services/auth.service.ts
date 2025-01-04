import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // Backend API endpoint

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'register', userData);
  }
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl + 'login', credentials);
  }

  
}
