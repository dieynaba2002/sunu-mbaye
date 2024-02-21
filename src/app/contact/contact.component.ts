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

  // Variables pour faire la vérifications
  verifNom: String = '';
  verifEmail: String = '';
  verifTelephone: String = '';

  // Variables si les champs sont exacts
  exactNom: boolean = false;
  exactEmail: boolean = false;
  exactTelephone: boolean = false;

  // Verification du nom
  verifNomFonction() {
    this.exactNom = false;
    const nomPattern = /^[a-zA-Z][a-zA-Z -]{1,100}$/;
    if (this.nom == '') {
      this.verifNom = 'Veuillez renseigner votre nom';
    } else if (this.nom.length < 2) {
      this.verifNom = 'Le nom est trop court';
    } else if (!this.nom.match(nomPattern)) {
      this.verifNom = 'Le nom ne dois pas avoir de caractere  speciaux';
    } else {
      this.verifNom = '';
      this.exactNom = true;
    }
    if (this.nom == '') {
      this.verifNom = '';
    }
  }

  // Verification de  l'email
  verifEmailFonction() {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.exactEmail = false;

    if (this.email == '') {
      this.verifEmail = 'Veuillez renseigner votre email';
    } else if (!this.email.match(emailPattern)) {
      this.verifEmail = 'Veuillez donner un email valide';
    } else {
      this.verifEmail = '';
      this.exactEmail = true;
    }
    if (this.email == '') {
      this.verifEmail = '';
    }
  }

  verifTelephoneFonction() {
    this.exactTelephone = false;
    const telephonePattern = /^\+221(76|77|78|70|33)\d{7}$/;

    if (this.telephone === '') {
      this.verifTelephone = 'Veuillez renseigner votre numéro de téléphone';
    } else if (/\s/.test(this.telephone)) {
      this.verifTelephone =
        "Le numéro de téléphone ne doit pas contenir d'espaces";
    } else if (!telephonePattern.test(this.telephone)) {
      this.verifTelephone = 'Le format du numéro de téléphone est invalide';
    } else {
      this.verifTelephone = '';
      this.exactTelephone = true;
    }
    if (this.telephone == '') {
      this.verifTelephone = '';
    }
  }

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
