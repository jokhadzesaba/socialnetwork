import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Room, TopicWithCount } from '../interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  public getTopics(){
    return this.http.get<TopicWithCount[]>('http://127.0.0.1:8000/api/countTopics')
  }
  public getRooms(){
    return this.http.get<Room[]>('http://127.0.0.1:8000/api/rooms')
  }
  public getRoomById(id:string){
    return this.http.get<Room>(`http://127.0.0.1:8000/api/room/${id}`)
  }
}
