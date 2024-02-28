import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './apiUrl';
import { Categorie } from '../models/categorie.model';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  categorie = new Subject<Categorie[]>();

  constructor(private http: HttpClient) {}

  // Liste
  // getAlls(): Observable<any> {
  //   return this.http.get<Categorie[]>(`${url}/listeCategorie`);
  // }

  getAlls(): Observable<any> {
    return this.http.get<Categorie[]>(`${url}/listeCategorie`).pipe(
      tap((data) => console.log('Données des catégories:', data)),
      catchError((error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
        return of(null); // Gérer l'erreur comme vous le souhaitez
      })
    );
  }

  addCategorie(categorie: Categorie) {
    // return this.http.post<{ message: string }>(
    //   `${url}/AjoutCategorie`,

    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.post<any>(`${url}/AjoutCategorie`, categorie, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  // Suppression
  delete(id: number) {
    return this.http.delete<{ message: string }>(`${url}/supCategorie/` + id);
  }

  // Fonction pour afficher un sweetalert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 900,
    });
  }
}
