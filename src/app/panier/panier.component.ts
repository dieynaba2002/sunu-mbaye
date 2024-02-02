import { Component } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent {
  // Attributs
  public quantite = 1;
  public panier: any = [];
  public nombreArticles = 0;
  public sommeArticles = 0;

  constructor(
    private panierService: PanierService,
    private router: Router,
    private categoriesService: CategorieService
  ) {}
  ngOnInit(): void {
    this.panierService.cart$.subscribe((cart) => {
      this.panier = cart;
      console.log('Panier mis à jour :', this.panier);
      this.totalArticles();
    });
    this.totalArticles();
    this.panier = this.panierService.getCart();
  }

  // Méthode appelée lorsqu'un produit est ajouté au panier
  addToCart(product: any): void {
    this.panierService.addToCart(product);
  }

  updateCartItem(item: any): void {
    // Mettez à jour le panier avec la nouvelle quantité
    this.panierService.updateCartItem(item);
  }

  removeFromCart(item: any): void {
    // Supprimer l'article du panier
    this.panierService.removeFromCart(item);
  }

  

  totalArticles() {
    this.nombreArticles = 0;
    this.sommeArticles = 0;

    let panier = this.panierService.getCart();
    // let panier = this.panierService.getFromPanier();
    panier.forEach((element: any) => {
      this.nombreArticles += element.quantity;
      this.sommeArticles += element.quantity * element.prix;
    });
    console.log('Somme des articles :', this.sommeArticles);
  }
}
