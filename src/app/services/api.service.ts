import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity, Room, TopicWithCount, UserData } from '../interface';
import { BehaviorSubject, map, switchMap, take } from 'rxjs';
import { UserService } from './user.service';
import { Url } from 'node:url';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://127.0.0.1:8000/api';
  public topicName = new BehaviorSubject<string>('All');
  public searchParam = new BehaviorSubject<string>('');
  public activityParam = new BehaviorSubject<string>('All');
  

  constructor(private http: HttpClient, private user: UserService) {}

  public getTopics() {
    return this.http.get<TopicWithCount[]>(`${this.url}/countTopics`);
  }
  public getRooms() {
    return this.http.get<Room[]>(`${this.url}/rooms`);
  }
  public getRoomsByTopic(topicName: string) {
    return this.http.get<Room[]>(`${this.url}/topic/${topicName}`);
  }
  public searchRooms(searchParam: string) {
    return this.http.get<Room[]>(`${this.url}/search/${searchParam}`);
  }
  
  public getRoomById(id: string) {
    return this.http.get<Room>(`${this.url}/room/${id}`);
  }
  public getActivity(searchParam: string) {
      return this.http.get<Activity[]>(`${this.url}/activity/${searchParam}`,);
    
  }
  public createRoom(formData: FormData) {
    return this.user.userData$.pipe(
      take(1),
      switchMap((userData: UserData) => {
        formData.append('email', userData.user.email); // Append email dynamically
        return this.http.post(`${this.url}/create-room`, formData);
      })
    );
  }
  
  public postMessage(message: string, roomId: string) {
    return this.user.userData$.pipe(
      take(1),
      switchMap((userData: UserData) => {
        const email = userData.user.email;
        return this.http.post(`${this.url}/create-message`, {
          message,
          roomId,
          email,
        });
      })
    );
  }
}
