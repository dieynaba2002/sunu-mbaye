import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-information-profil',
  templateUrl: './information-profil.component.html',
  styleUrls: ['./information-profil.component.css'],
})
export class InformationProfilComponent implements OnInit {
  // Les attributs
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  email: string = '';
  contact: string = '';
  image: string = '';

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('userOnline');

    if (userString) {
      const user = JSON.parse(userString);
      this.nom = user.nom; 
      this.prenom = user.prenom;
      this.adresse = user.adresse;
      this.email = user.email;
      this.contact = user.telephone;
      this.image = user.image;
    }
  }
}
