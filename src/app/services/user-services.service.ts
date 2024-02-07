import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { url } from './apiUrl';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private apiUrl = 'http://127.0.0.1:8000/api/inscription';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  addUser(User: any): Observable<User> {
    return this.http.post<User>(this.apiUrl, User);
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  updateUser(id: number, user: any): Observable<any> {
    const accessToken = localStorage.getItem('userOnline');

    return accessToken
      ? this.http.put<any>(`${url}/updateUser/${id}`, user, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
      : of(null);
  }

  getUserInfo(): any {
    const userString = localStorage.getItem('userOnline');
    return userString ? JSON.parse(userString) : null;
  }

  // bloquerUtilisateur(id: number): Observable<{ message: string }> {
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     return throwError('Utilisateur non connecté');
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${accessToken}`,
  //   });
  //   return this.http.delete<{ message: string }>(`${url}/BloquerUser/` + id, {
  //     headers,
  //   });
  // }

  bloquerUtilisateur(
    id: number,
    newState: boolean
  ): Observable<{ message: string }> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    // Construire l'URL en fonction du nouvel état de blocage
    const urlWithState = `${url}/BloquerUser/${id}?bloque=${newState}`;

    return this.http.delete<{ message: string }>(urlWithState, { headers });
  }

  debloquerUtilisateur(id: number): Observable<{ message: string }> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return throwError('Utilisateur non connecté');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    const urlWithState = `${url}/debloquerUser/${id}`;

    return this.http.delete<{ message: string }>(urlWithState, { headers });
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
