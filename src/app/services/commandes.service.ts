import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { url } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommandesService {
  constructor(private http: HttpClient) {}

  getAllComandes(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return accessToken
      ? this.http.get<any>(`${url}/listeCommandes`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }

  getDetailsCommande(commandeId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
      return this.http.get<any>(`${url}/VoirplusCommende/${commandeId}`, {
        headers,
      });
    } else {
      // Retourne un observable avec null si aucun jeton d'accès n'est disponible
      return of(null);
    }
  }

  // detail commande revendeur
  getCommandeRevendeur(id: string) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
      return this.http.get<any>(`${url}/VoirplusCommendeRevendeur/` + id, {
        headers,
      });
    } else {
      // Retourne un observable avec null si aucun jeton d'accès n'est disponible
      return of(null);
    }
  }

  annulerCommande(commandeId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
      return this.http.put<any>(
        `${url}/AnnulerLivraison/${commandeId}`,
        {}, // Le corps de la requête est vide car aucune donnée supplémentaire n'est nécessaire
        { headers }
      );
    } else {
      // Gérer le cas où aucun jeton d'accès n'est disponible
      return of(null);
    }
  }

  terminerCommande(commandeId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      });
      return this.http.put<any>(
        `${url}/LivraisonTerminer/${commandeId}`,
        {}, // Le corps de la requête est vide car aucune donnée supplémentaire n'est nécessaire
        { headers }
      );
    } else {
      // Gérer le cas où aucun jeton d'accès n'est disponible
      return of(null);
    }
  }
}
  
