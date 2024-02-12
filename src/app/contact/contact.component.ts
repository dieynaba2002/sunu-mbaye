import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private messageService: MessagesService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // nos variables
  nom: string = '';
  email: string = '';
  telephone: string = '';
  message: string = '';

  AjoutMessage() {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (
      this.nom == '' ||
      this.email == '' ||
      this.telephone == '' ||
      this.message == ''
    ) {
      this.messageService.alertMessage(
        'error',
        'Attention',
        'Renseigner tous les champs'
      );
    } else if (!this.email.match(emailPattern)) {
      this.messageService.alertMessage('error', 'Attention', 'Email invalide');
    } else {
      let newUser: Message = {
        nom: this.nom,
        email: this.email,
        telephone: this.telephone,
        message: this.message,
      };
      console.log(newUser);
      this.messageService.addMessage(newUser).subscribe((response) => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        this.messageService.alertMessage(
          'success',
          'Bravo!',
          'Message envoyer avec succés'
        );
        this.viderChamps();
        // this.loadProduit();
      });
    }
  }

  viderChamps() {
    this.nom = "";
    this.email = "";
    this.telephone = "";
    this.message = "";
  }
}
