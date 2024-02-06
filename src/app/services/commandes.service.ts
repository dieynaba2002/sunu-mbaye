import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
      ? this.http.get<any>(`${url}/ListerCommende`, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
          }),
        })
      : of(null);
  }
}
