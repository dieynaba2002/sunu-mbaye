import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import Swal from 'sweetalert2';
import { url } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private cart: any[] = [];
  private cartSubject = new Subject<any[]>();
  cart$ = this.cartSubject.asObservable();
  private userId: string | null = null;

  getCart(): any[] {
    return this.cart;
  }

  addToCart(product: any): void {
    // On Vérifie si le produit existe déjà dans le panier
    const existingProduct = this.cart.find((p) => p.id === product.id);
    if (existingProduct) {
      // Si le produit existe, augmenter la quantité
      existingProduct.quantity += 1;
    } else {
      // Sinon, ajouter le produit au panier avec une quantité de 1
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
    this.alertMessage(
      'success',
      'Produit ajouté',
      'Le produit a été ajouté au panier avec succès.',
    );
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    // Émettre les changements du panier
    this.cartSubject.next(this.cart);
  }

  private loadCart(): void {
    const cartString = localStorage.getItem('cart');
    this.cart = cartString ? JSON.parse(cartString) : [];
  }

  updateCartItem(product: any): void {
    // Mise à jour du panier
    const existingProduct = this.cart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = product.quantity;
      this.saveCart();
    }
  }

  removeFromCart(productId: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      // Si l'utilisateur a confirmé, supprimer l'article du panier
      if (result.isConfirmed) {
        this.cart = this.cart.filter((item) => item.id !== productId);
        this.saveCart();
        this.alertMessage(
          'success',
          'Produit supprimé',
          'Le produit a été supprimé du panier.'
        );
      }
    });
  }

  getFromPanier() {
    return JSON.parse(localStorage.getItem('cart') ?? '[]');
  }

  addPayment(data: any) {
    const accessToken = localStorage.getItem('access_token');
    return accessToken
      ? this.http.post<any>(`${url}/Commender ` , data, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  // Fonction pour afficher un sweetalert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  setUserId(userId: string): void {
    this.userId = userId;
    this.loadCart();
  }
}
