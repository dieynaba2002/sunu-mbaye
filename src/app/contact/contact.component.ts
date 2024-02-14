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
  ngOnInit(): void {}
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
    } else if (this.nom.length < 3) {
      this.messageService.alertMessage(
        'error',
        'Attention',
        'Le prénom doit contenir au moins 3 caractères!'
      );
    } else if (/\s/.test(this.telephone)) {
      this.messageService.alertMessage(
        'error',
        'Attention',
        "Le numéro de téléphone ne doit pas contenir d'espaces!"
      );
    } else if (!this.telephone.match(/^(\+221|221)?[76|77|78|70|33]\d{8}$/)) {
      this.messageService.alertMessage(
        'error',
        'Attention',
        'Le format du numéro de téléphone est invalide!'
      );
    } else {
      let newUser: Message = {
        nom: this.nom,
        email: this.email,
        telephone: this.telephone,
        message: this.message,
      };
      console.log(newUser);
      this.messageService.addMessage(newUser).subscribe(
        (response) => {
          console.log('====================================');
          console.log(response);
          console.log('====================================');
          this.messageService.alertMessage(
            'success',
            'Bravo!',
            'Message envoyer avec succés'
          );
          this.viderChamps();
        },
        (error) => {
          console.error(
            "Erreur lors de l'envoi du message:",
            error.error.message
          );
          this.messageService.alertMessage(
            'error',
            'Erreur!',
            error.error.message
          );
        }
      );
    }
  }

  viderChamps() {
    this.nom = '';
    this.email = '';
    this.telephone = '';
    this.message = '';
  }
}
