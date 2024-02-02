import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private authService: AuthServiceService) {}

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
