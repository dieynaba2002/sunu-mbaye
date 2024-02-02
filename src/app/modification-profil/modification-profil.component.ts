import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-modification-profil',
  templateUrl: './modification-profil.component.html',
  styleUrls: ['./modification-profil.component.css'],
})
export class ModificationProfilComponent {
  // Les attributs
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  email: string = '';
  contact: string = '';
  password: string = '';
  telephone: string = '';

  seletedUser: any = {};

  constructor(
    private authService: AuthServiceService,
    private userService: UserServicesService
  ) {}

  ngOnInit(): void {
    const userInfo = this.userService.getUserInfo();

    if (userInfo) {
      if (userInfo) {
        this.seletedUser = userInfo.id;
        this.nom = userInfo.nom;
        this.prenom = userInfo.prenom;
        this.adresse = userInfo.adresse;
        this.email = userInfo.email;
        this.telephone = userInfo.telephone;
      }
    }
  }

  // fonction pour modifier
  // modifierUser() {
  //   const data = {
  //     nom: this.nom,
  //     prenom: this.prenom,
  //     email: this.email,
  //     password: this.password,
  //     telephone: this.telephone,
  //     adresse: this.adresse,
  //   };

  //   console.log('rtyu', this.seletedUser);
  //   // console.log(data)
  //   this.userService
  //     .updateUser(this.seletedUser, data)
  //     .subscribe((response) => {
  //       console.log(response);
  //     });

  //   console.log('Selected user:', this.seletedUser);
  // }
  modifierUser() {
    const data = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      telephone: this.telephone,
      adresse: this.adresse,
    };

    console.log('Selected user:', this.seletedUser);

    // Assurez-vous que votre service updateUser fonctionne correctement
    this.userService.updateUser(this.seletedUser, data).subscribe(
      (response) => {
        console.log('Update response:', response);
        // Vous pouvez gérer la réponse du backend ici, par exemple, afficher un message de succès
      },
      (error) => {
        console.error('Update error:', error);
        // Vous pouvez gérer l'erreur ici, par exemple, afficher un message d'erreur
      }
    );
  }

  chargerInfosUser(user: any) {
    this.seletedUser = user.id;
    console.log('novysvd', user);
    this.nom = user.nom_user;
    this.prenom = user.prenom;
    this.email = user.email;
    this.password = user.password;
    this.telephone = user.telephone;
    this.adresse = user.adresse;
  }
}
