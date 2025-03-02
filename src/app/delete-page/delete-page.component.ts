import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './delete-page.component.html',
  styleUrl: './delete-page.component.scss',
})
export class DeletePageComponent implements OnInit {
  message?: string;
  id?: number;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.message = params['message'];
      console.log(this.id, this.message);
    });
  }
  confirm() {
    if (this.id) {
      this.apiService.deleteRoom(this.id).subscribe()
    }
  }
}
