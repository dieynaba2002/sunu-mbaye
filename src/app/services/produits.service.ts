import { Injectable } from '@angular/core';
import { Produit } from '../models/produits.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { url } from './apiUrl';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  produit = new Subject<Produit[]>();

  constructor(private http: HttpClient) {}


  getAllsProduit(): Observable<any> {
    return this.http.get<Produit[]>(`${url}/produits`).pipe(
      tap((data) => console.log('Données des produits:', data)),
      catchError((error) => {
        console.error('Erreur lors de la récupération des produits:', error);
        return of(null); 
      })
    );
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
  deleteProduit(id: number) {
    return this.http.delete<{ message: string }>(`${url}/supProduit/` + id);
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
