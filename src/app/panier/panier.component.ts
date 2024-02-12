import { Component } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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
    private categoriesService: CategorieService,
    private authService: AuthServiceService,
    private http: HttpClient
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

  
  payer() {
    let panier = this.panierService.getFromPanier();
    // Vérifier si le panier est vide
    if (panier.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Panier vide',
        text: 'Votre panier est vide. Veuillez le remplir avant de passer une commande.',
      });
      return; // Arrêter l'exécution de la fonction
    }
    if (this.authService.isAuthenticated) {
      let panier = this.panierService.getFromPanier();
      let panierProduit: any[] = [];

      panier.forEach((element: any) => {
        panierProduit.push({
          produit_id: element.id,
          nombre_produit: element.quantity,
          montant: element.prix * element.quantity,
        });
      });
      let panierToSend = {
        panier: panierProduit,
      };
      console.log(panierToSend);

      this.panierService.addPayment(panierToSend).subscribe((reponse: any) => {
        console.warn(reponse);
        window.open(reponse.payment_url, '_self');
      });
    } else {
      console.log(
        'Utilisateur non connecté. Redirection vers la page de connexion...'
      );
      this.router.navigate(['/login']);
    }
  }
}
