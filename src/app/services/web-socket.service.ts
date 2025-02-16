import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();

  connect(roomId: string) {
    this.socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}/`);

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageSubject.next(message); // Push received message
    };

    this.socket.onopen = () => console.log('WebSocket connected!');
    this.socket.onclose = () => console.log('WebSocket closed!');
  }

  sendMessage(data: { message: string; email: string }) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open.');
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
