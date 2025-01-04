import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  token = localStorage.getItem('token')
  header = new HttpHeaders({'Authorization': `Token ${this.token}`})


  constructor(private http: HttpClient) { }

  getUser(){
    const token = localStorage.getItem('token')
    const header = new HttpHeaders({'Authorization': `Token ${this.token}`})
    return this.http.get<UserData>(`${this.apiUrl}/user`,{headers:this.header})
  }
}
