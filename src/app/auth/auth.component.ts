import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../services/auth-service.service';
import { User } from '../models/user.model';
import { UserServicesService } from '../services/user-services.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  // Declarations des variables
  nomComplet: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  telephone: string = '';
  image: any = '';
  role: any = 0;
  adresse: string = '';
  sexe: string = '';

  formChoice = true;

  emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  tabUtilisateurs: any[] = [];

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserServicesService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    // Vérifier si les champs email et password ne sont pas vides avant d'appeler login()
    if (this.email !== '' && this.password !== '') {
      this.login();
    }
  }

  // Methode pour s'inscrire
  inscription() {
    if (this.nom == '') {
      this.alertMessage('error', 'Attention', 'Merci de renseigner votre nom!');
    } else if (this.prenom == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre prenom!'
      );
    } else if (this.email == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre email!'
      );
    } else if (!this.email.match(this.emailPattern)) {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner un email valide!'
      );
    } else if (this.password == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner le mot de passe!'
      );
    } else if (this.password.length < 8) {
      this.alertMessage(
        'error',
        'Attention',
        'le mot de ppasse doit etre supérieur ou égal à 8!'
      );
    } else if (this.telephone == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre numéro de téléphone!'
      );
    } else {
      // let newUser: User = {
      //   nom: this.nom,
      //   prenom: this.prenom,
      //   email: this.email,
      //   password: this.password,
      //   role_id: this.role,
      //   telephone: this.telephone,
      //   image: this.image,
      //   adresse: this.adresse,
      // };
      let formData = new FormData();
      formData.append('nom', this.nom);
      formData.append('prenom', this.prenom);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('role_id', this.role);
      formData.append('telephone', this.telephone);
      formData.append('adresse', this.adresse);
      formData.append('image', this.image);
      console.log(formData);
      // Appel du service pour ajouter le nouvel utilisateur
      this.userService.addUser(formData).subscribe(
        (addedUser) => {
          // L'utilisateur a été ajouté avec succès
          this.alertMessage(
            'success',
            'Super',
            'Inscription réussie avec succés!'
          );
          console.log('Utilisateur ajouté:', addedUser);
          this.ShowForm();
          // Rediriger vers la page de connexion
          // this.router.navigate(['/login']);
        },
        (error) => {
          // Gestion des erreurs lors de l'ajout de l'utilisateur
          console.error("Erreur lors de l'ajout de l'utilisateur:", error);
          this.alertMessage(
            'error',
            'Erreur',
            "Erreur lors de l'inscription. Veuillez réessayer."
          );
        }
      );
    }
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  // Methode pour faire la connexion
  // login() {
  //   if (this.email == '') {
  //     this.alertMessage('error', 'Attention', "Renseigner l'email");
  //   } else if (this.password == '') {
  //     this.alertMessage('error', 'Attention', 'Renseigner le mot de passe');
  //   } else {
  //     // Envoyer les informations d'identification au backend via une API
  //     this.authService.login(this.email, this.password).subscribe(
  //       (response) => {
  //         // console.log('====================================');
  //         // console.log(response);
  //         // console.log('====================================');
  //         // Stocker le token dans le localStorage
  //         localStorage.setItem('userOnline', JSON.stringify(response.user));
  //         localStorage.setItem(
  //           'access_token',
  //           JSON.stringify(response.token).replace(/['"]+/g, '')
  //         );
  //         // Stocker l'utilisateur dans une variable
  //         const loggedInUser = response.user;
  //         // Gérer la réponse réussie du backend
  //         if (
  //           response.user.email === 'admin@gmail.com' &&
  //           response.user.password === 'admin@123' &&
  //           response.user.role_id == 1
  //         ) {
  //           this.router.navigate(['/admin']);
  //           this.alertMessage(
  //             'success',
  //             'Bienvenue',
  //             'Connexion réussie avec succès'
  //           );
  //         } else if (response.user.role_id == 3) {
  //           this.router.navigate(['/agriculteur']);
  //           this.alertMessage(
  //             'success',
  //             'Bienvenue',
  //             'Connexion réussie avec succès'
  //           );
  //         } else if (response.user.role_id == 2) {
  //           this.router.navigate(['/accueil']);
  //           this.alertMessage(
  //             'success',
  //             'Bienvenue',
  //             'Connexion réussie avec succès'
  //           );
  //         }
  //         this.panierService.setUserId(user.id);
  //       },
  //       (error) => {
  //         // Gérer l'échec de l'authentification
  //         console.log("Erreur d'authentification:", error);
  //         this.alertMessage(
  //           'error',
  //           'Erreur',
  //           'Email ou mot de passe incorrect'
  //         );
  //       }
  //     );
  //   }
  // }

  login() {
    if (this.email == '') {
      this.alertMessage('error', 'Attention', "Renseigner l'email");
    } else if (this.password == '') {
      this.alertMessage('error', 'Attention', 'Renseigner le mot de passe');
    } else {
      // Envoyer les informations d'identification au backend via une API
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          // Stocker le token dans le localStorage
          localStorage.setItem('userOnline', JSON.stringify(response.user));
          localStorage.setItem(
            'access_token',
            JSON.stringify(response.token).replace(/['"]+/g, '')
          );

          // Stocker l'utilisateur dans une variable
          const loggedInUser = response.user;

          // Gérer la réponse réussie du backend
          if (
            loggedInUser.email === 'admin@gmail.com' &&
            loggedInUser.password === 'admin@123' &&
            loggedInUser.role_id == 1
          ) {
            this.router.navigate(['/admin']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          } else if (loggedInUser.role_id == 3) {
            this.router.navigate(['/agriculteur']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          } else if (loggedInUser.role_id == 2) {
            this.router.navigate(['/accueil']);
            this.alertMessage(
              'success',
              'Bienvenue',
              'Connexion réussie avec succès'
            );
          }

          // Appeler la méthode setUserId du service panier pour associer le panier à l'utilisateur
          this.panierService.setUserId(loggedInUser.id);
        },
        (error) => {
          // Gérer l'échec de l'authentification
          console.log("Erreur d'authentification:", error);
          this.alertMessage(
            'error',
            'Erreur',
            'Email ou mot de passe incorrect'
          );
        }
      );
    }
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Methode pour choisir le formulaire
  ShowForm() {
    this.email = '';
    this.password = '';
    this.formChoice = !this.formChoice;
  }

  // Fonction pour afficher un sweetalert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
}
