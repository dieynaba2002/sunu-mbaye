import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Message, MessageResponse } from '../models/message.model';
import { url } from './apiUrl';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getMessages(): Observable<MessageResponse> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken
      ? this.http
          .get<MessageResponse>(`${url}/listerMessages`, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${accessToken}`,
            }),
          })
          .pipe(
            catchError((error: any) => {
              console.error('Error fetching messages:', error);
              return of({ status: false, messages: [] });
            })
          )
      : of({ status: false, messages: [] });
  }

  addMessage(message: any): Observable<Message> {
    return this.http.post<any>(`${url}/ajouterMessage`, message);
  }

  // Méthode pour envoyer un message

  sendResponse(send: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return accessToken
      ? this.http
          .post<any>(`${url}/reponse`, send, {
            headers: new HttpHeaders({
              Authorization: `Bearer ${accessToken}`,
            }),
          })
          .pipe(
            catchError((error: any) => {
              console.error('Error fetching messages:', error);
              return of({ status: false, messages: [] });
            })
          )
      : of({ status: false, messages: [] });
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
