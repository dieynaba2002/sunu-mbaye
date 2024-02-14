import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserServicesService } from 'src/app/services/user-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-agriculteur',
  templateUrl: './profil-agriculteur.component.html',
  styleUrls: ['./profil-agriculteur.component.css'],
})
export class ProfilAgriculteurComponent implements OnInit {
  userInfo:any;
  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
    if (this.userInfo) {
      this.chargerInfosUser(this.userInfo);
    }
  }

  constructor(
    private userService: UserServicesService,
    private http: HttpClient
  ) {}

  // Les attributs
  seletedUser: number = 0;
  // selectedUser: User | undefined ;

  nom: string = '';
  prenom: string = '';
  nomComplet: string = '';
  email: string = '';
  password: string = '';
  telephone: string = '';
  role_id: number = 0;
  adresse: string = '';
  images: string = '';
 


  // fonction pour modifier
  userOnline = JSON.parse(localStorage.getItem('userOnline') || '');
  modifierUser() {
    const data = {
      nom: this.nom,
      prenom: this.prenom,
      password: this.password,
      email: this.email,
      adresse: this.adresse,
      telephone: this.telephone,
      role_id: this.userOnline.role_id,
    };

    console.log('rtyu', this.seletedUser);
    console.log(data);
    this.userService.updateUser(this.userInfo.id, data).subscribe((response) => {
      console.log('je suis la reponse', response);
    });
  }

  

  chargerInfosUser(user: any) {
    this.seletedUser = user.id;
    console.log('je suis id user', this.seletedUser);

    this.nom = user.nom;
    console.log('je suis le user', user);
    this.prenom = user.prenom;
    this.images = user.images;
    this.email = user.email;
    this.adresse = user.adresse;
    this.telephone = user.telephone;
  }
}
