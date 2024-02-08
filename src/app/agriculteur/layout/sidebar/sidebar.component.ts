import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/script.js';
    document.body.appendChild(script);
  }

  logout() {
    this.authService.logout();
  }
}
