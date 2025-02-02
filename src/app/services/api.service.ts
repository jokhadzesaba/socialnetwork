import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, TopicWithCount, UserData } from '../interface';
import { map, switchMap, take } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private user: UserService) {}

  public getTopics() {
    return this.http.get<TopicWithCount[]>(`${this.url}/countTopics`);
  }
  public getRooms() {
    return this.http.get<Room[]>(`${this.url}/rooms`);
  }
  public getRoomById(id: string) {
    return this.http.get<Room>(`${this.url}/room/${id}`);
  }
  public createRoom(topic: string, name: string, description: string) {
    return this.user.userData$.pipe(
      take(1),
      switchMap((userData: UserData) => {
        const email = userData.user.email;
        return this.http.post(`${this.url}/create-room`, {
          topic,
          name,
          description,
          email,
        });
      })
    );
  }
  public postMessage(message:string,roomId:string){
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
