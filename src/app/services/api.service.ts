import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Activity,
  Room,
  TopicWithCount,
  User,
  UserData,
  UserWithoutId,
} from '../interface';
import { BehaviorSubject, map, switchMap, take } from 'rxjs';
import { UserService } from './user.service';


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
    return this.http.get<Activity[]>(`${this.url}/activity/${searchParam}`);
  }
  public createRoom(formData: FormData) {
    return this.user.userData$.pipe(
      take(1),
      switchMap((userData: User) => {
        formData.append('email', userData.email);
        return this.http.post(`${this.url}/create-room`, formData);
      })
    );
  }

  public postMessage(message: string, roomId: string) {
    return this.user.userData$.pipe(
      take(1),
      switchMap((userData: User) => {
        const email = userData.email;
        return this.http.post(`${this.url}/create-message`, {
          message,
          roomId,
          email,
        });
      })
    );
  }
  public deleteRoom(id: number) {
    return this.http.delete(`${this.url}/deleteRoom/${id}`);
  }
  updateUser(data: UserWithoutId, file?: File) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.bio) {
      formData.append('bio', data.bio);
    }
    formData.append('avatar', data.avatar);
    return this.http.post(`${this.url}/update-profile`, formData, {
      headers: this.user.getAuthHeaders(),
    })
  }
}
