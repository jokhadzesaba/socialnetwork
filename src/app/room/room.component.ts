import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { Room } from '../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{
  public roomData?:Observable<Room>
  constructor(private apiService:ApiService){}
  ngOnInit(): void {
    this.roomData = this.apiService.getRoomById('1')
  }

}
