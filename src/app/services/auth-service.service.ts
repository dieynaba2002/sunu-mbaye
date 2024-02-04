import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { url } from './apiUrl';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isAdmin$ = new BehaviorSubject<boolean>(false);
  private authToken = '';
  private userId = '';

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  url = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const credentials = { email: email, password: password };

    return this.http.post<any>(this.url, credentials).pipe(
      tap((response) => {
        if (response.user) {
          this.isAuthenticatedSubject.next(true);
          this.isAdmin$.next(response.user.role_id === 1);
          this.router.navigate(['/admin']);
        }
      })
    );
  }

  logout() {
    // Logique de déconnexion
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('userOnline');
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Retourne la val du token envoyé par le back sous forme d'objet => Exemple :  { "userId": "6477aad2457309c8a3e3d031", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc3YWFkMjQ1NzMwOWM4YTNlM2QwMzEiLCJpYXQiOjE2ODU2MjMzOTksImV4cCI6MTY4NTcwOTc5OX0.18cpQsPFDGJWTFKeRHn92mOwLS04BDDAeewWo582rvM"}
  getToken() {
    return this.authToken;
  }

  // Retourne la val du token envoyé par le back sous forme d'objet
  getUserId() {
    return this.userId;
  }

  getAllsUsers(): Observable<any> {
    return this.http.get<User[]>(`${url}/listeUser`).pipe(
      tap((data) => console.log('Données des catégories:', data)),
      catchError((error) => {
        console.error('Erreur lors de la récupération des catégories:', error);
        return of(null); // Gérer l'erreur comme vous le souhaitez
      })
    );
  }

  getAllsUsersByAdmin(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return accessToken
      ? this.http.get<any>(`${url}/listeUser`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
    // return this.http.get<User[]>(`${url}/listeUser`).pipe(
    //   tap((data) => console.log('Données des catégories:', data)),
    //   catchError((error) => {
    //     console.error('Erreur lors de la récupération des catégories:', error);
    //     return of(null); // Gérer l'erreur comme vous le souhaitez
    //   })
    // );
  }
 

// Service qui verifie quel utilisateur est connecter
  IsOnline(): { user: User | null; role: string | null } {
    const userOnlineString = localStorage.getItem('userOnline');
    if (userOnlineString) {
      const userOnline = JSON.parse(userOnlineString);
      const role = userOnline && userOnline.role_id ? userOnline.role_id.toString() : null;
      return { user: userOnline, role: role };
    }
    return { user: null, role: null };
  }

  isUserLoggedIn(): boolean {
    const { user, role } = this.IsOnline();
    return user !== null && role === '2'; 
  }
}
