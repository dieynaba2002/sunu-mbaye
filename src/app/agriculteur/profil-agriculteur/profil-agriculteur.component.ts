import { Component, OnInit } from '@angular/core';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-profil-agriculteur',
  templateUrl: './profil-agriculteur.component.html',
  styleUrls: ['./profil-agriculteur.component.css'],
})
export class ProfilAgriculteurComponent implements OnInit {
  ngOnInit(): void {
    const userInfo = this.userService.getUserInfo();
    if (userInfo) {
      this.chargerInfosUser(userInfo);
    }
  }

  constructor(private userService: UserServicesService) {}

  // Les attributs
  seletedUser: any = {};

  nom: string = '';
  prenom: string = '';
  nomComplet: string = '';
  email: string = '';
  password: string = '';
  telephone: string = '';
  role_id: number = 0;
  adresse: string = '';

  // chargerInfosProduit(user: any) {
  //   this.seletedUser = user.id;
  //   console.log('novysvd', user);
  //   this.nomComplet = user.nom && user.prenom;
  //   this.role_id = this.userConnect.role_id
  //   // this.nom = user.nom;
  //   // this.prenom = user.prenom;
  //   this.email = user.email;
  //   this.telephone = user.telephone;
  //   this.password = user.password;
  // }

  // fonction pour modifier
  userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
  modifierUser() {
    const data = {
      nom: this.nom,
      prenom: this.prenom,
      password: this.password,
      email: this.email,
      adresse: this.adresse,
      telephone: this.telephone,
      role_id: this.userConnect.role_id,
    };

    console.log('rtyu', this.seletedUser);
    // console.log(data)
    // this.userService.updateUser(this.seletedUser, data).subscribe((response) => {
    //     console.log('je suis la reponse',response);
    // });
    this.userService.updateUser(this.seletedUser, data).subscribe(
      (response) => {
        console.log('Mise à jour réussie:', response);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      }
    );
    // this.loadProduit();
    // console.warn(data);
  }

  chargerInfosUser(user: any) {
    this.seletedUser = user.id;
    console.log('je suis id user', this.seletedUser);
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.email = user.email;
    this.adresse = user.adresse;
    this.telephone = user.telephone;
  }
}
