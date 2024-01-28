import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isAdmin$ = new BehaviorSubject<boolean>(false);

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  url = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const credentials = { email: email, password: password };

    return this.http.post<any>(this.url, credentials).pipe(
      tap((response) => {
        if (response.user) {
          this.isAuthenticatedSubject.next(true);
          this.isAdmin$.next(response.user.role_id === 1); // Mettez à jour en fonction de votre logique de rôle
          // Gérer la redirection ici si nécessaire
          this.router.navigate(['/admin']);
        }
      })
    );
  }

  logout() {
    // Logique de déconnexion
    this.isAuthenticatedSubject.next(false);
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
