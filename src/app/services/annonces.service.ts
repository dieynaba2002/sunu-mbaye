import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, throwError } from 'rxjs';
import { url } from './apiUrl';
import Swal from 'sweetalert2';
import { Annonce } from '../models/annonces.model';

@Injectable({
  providedIn: 'root',
})
export class AnnoncesService {
  annonce = new Subject<Annonce[]>();
  constructor(private http: HttpClient) {}

  getAllsAnnonces(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.get<any>(`${url}/listeAnnonceAgriculteur`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  getAllsAnnonceByAdmin(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.get<any>(`${url}/listAnnonce`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  getByAnnonceId(id: string) {
    return this.http
      .get<Annonce>(`${url}/listeAnnonceAgriculteur/` + id)
      .pipe(catchError((error) => throwError(error.error.message)));
  }

  addAnnonce(annonce: any) {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.post<any>(`${url}/ajoutAnnonce`, annonce, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  deleteAnnonce(id: number): Observable<{ message: string }> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Redirigez l'utilisateur vers la page de connexion s'il n'est pas connecté
      // ou affichez un message d'erreur.
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.delete<{ message: string }>(`${url}/supAnnonce/` + id, {
      headers,
    });
  }

  updateAnnonce(id: number, annonce: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http.put<any>(`${url}/modifierAnnonce/${id}`, annonce, {
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
