import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  panierSize: number = 0;

  constructor(private authService: AuthServiceService, private panierService: PanierService) { }
  
  ngOnInit(): void {
    // on Metà jour la taille du panier 
    this.panierSize = this.panierService.getCart().reduce((total, item) => total + item.quantity, 0);
    this.panierService.cart$.subscribe((cart) => {
      this.panierSize = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }
    


  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
