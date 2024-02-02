import { Injectable } from '@angular/core';
import { Produit } from '../models/produits.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { url } from './apiUrl';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  produit = new Subject<Produit[]>();

  constructor(private http: HttpClient) {}

  // getAllsProduit(): Observable<any> {
  //   return this.http.get<Produit[]>(`${url}/listeProduitAgriculteur`).pipe(
  //     tap((data) => console.log('Données des produits:', data)),
  //     catchError((error) => {
  //       console.error('Erreur lors de la récupération des produits:', error);
  //       return of(null);
  //     })
  //   );
  // }

  getAllsProduit(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.get<any>(`${url}/listeProduitAgriculteur`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  getAllsProduitByAdmin(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.get<any>(`${url}/listeProduit`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  getByProduitId(id: string) {
    return this.http
      .get<Produit>(`${url}/listeProduitAgriculteur/` + id)
      .pipe(catchError((error) => throwError(error.error.message)));
  }

  addProduit(produit: any) {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.post<any>(`${url}/AjoutProduit`, produit, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  // Suppression
  // deleteProduit(id: number) {
  //   const accessToken = localStorage.getItem('access_token');
  //   return this.http.delete<{ message: string }>(`${url}/supProduit/` + id);
  // }

  deleteProduit(id: number): Observable<{ message: string }> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Redirigez l'utilisateur vers la page de connexion s'il n'est pas connecté
      // ou affichez un message d'erreur.
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.delete<{ message: string }>(`${url}/supProduit/` + id, {
      headers,
    });
  }

  updateProduit(id: number, produit: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.put<any>(`${url}/updateproduit/${id}`, produit, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  // Fonction pour afficher un sweetalert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
