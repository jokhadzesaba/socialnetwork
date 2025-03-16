import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { Router } from 'express';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { UserWithoutId } from '../interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-delete-update',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './delete-update.component.html',
  styleUrl: './delete-update.component.scss',
})
export class DeleteUpdateComponent {
  message?: string;
  id?: number;
  data?: UserWithoutId;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userService:UserService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
      }
      if (params['message']) {
        this.message = params['message'];
      }
      if (params['data']) {
        this.data = params['data'];
      }
    });
  }
  confirmDelete() {
    if (this.id) {
      this.apiService.deleteRoom(this.id).subscribe(()=>{
        
      });
    }
  }
  confirmUpdate() {
    if (this.data) {
      this.apiService.updateUser(this.data);
    }
  }
}
