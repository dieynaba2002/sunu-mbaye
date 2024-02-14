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
    } else if (this.nom.length < 2) {
      this.alertMessage(
        'error',
        'Attention',
        'Le nom doit contenir au moins 2 caractères!'
      );
    } else if (this.prenom.length < 3) {
      this.alertMessage(
        'error',
        'Attention',
        'Le prénom doit contenir au moins 3 caractères!'
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
    } else if (/\s/.test(this.password)) {
      this.alertMessage(
        'error',
        'Attention',
        "Le mot de passe ne doit pas contenir d'espaces!"
      );
    } else if (this.password.length < 8) {
      this.alertMessage(
        'error',
        'Attention',
        'le mot de passe doit etre supérieur ou égal à 8!'
      );
    } else if (this.telephone == '') {
      this.alertMessage(
        'error',
        'Attention',
        'Merci de renseigner votre numéro de téléphone!'
      );
    } else if (/\s/.test(this.telephone)) {
      this.alertMessage(
        'error',
        'Attention',
        "Le numéro de téléphone ne doit pas contenir d'espaces!"
      );
    } else if (!this.telephone.match(/^(\+221|221)?[76|77|78|70|33]\d{8}$/)) {
      this.alertMessage(
        'error',
        'Attention',
        'Le format du numéro de téléphone est invalide!'
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
      // this.userService.addUser(formData).subscribe(
      //   (addedUser) => {
      //     // L'utilisateur a été ajouté avec succès
      //     this.alertMessage(
      //       'success',
      //       'Super',
      //       'Inscription réussie avec succés!'
      //     );
      //     console.log('Utilisateur ajouté:', addedUser);
      //     this.ShowForm();
      //     // Rediriger vers la page de connexion
      //     // this.router.navigate(['/login']);
      //   },
      //   (error) => {
      //     // Gestion des erreurs lors de l'ajout de l'utilisateur
      //     console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      //     this.alertMessage(
      //       'error',
      //       'Erreur',
      //       "Erreur lors de l'inscription. Veuillez réessayer."
      //     );
      //   }
      // );

      this.userService.addUser(formData).subscribe(
        (addedUser) => {
          // L'utilisateur a été ajouté avec succès
          this.alertMessage(
            'success',
            'Super',
            'Inscription réussie avec succès!'
          );
          console.log('Utilisateur ajouté:', addedUser);
          this.ShowForm();
        },
        (error) => {
          // Gestion des erreurs lors de l'ajout de l'utilisateur
          console.error("Erreur lors de l'ajout de l'utilisateur:", error);

          // Vérifiez si l'erreur est une erreur de validation retournée par le backend
          if (error.status === 422 && error.error.errors) {
            const errors = error.error.errors;
            for (const key in errors) {
              if (errors.hasOwnProperty(key)) {
                const errorMsg = errors[key].join(', '); // Concaténer les messages d'erreur
                this.alertMessage('error', 'Erreur de validation', errorMsg);
              }
            }
          } else {
            // Pour d'autres types d'erreurs, affichez simplement un message d'erreur générique
            this.alertMessage(
              'error',
              'Erreur',
              "Erreur lors de l'inscription. Veuillez réessayer."
            );
          }
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
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (this.email == '') {
      this.alertMessage('error', 'Attention', "Renseigner l'email");
    } else if (this.password == '') {
      this.alertMessage('error', 'Attention', 'Renseigner le mot de passe');
    } else if (!this.email.match(emailPattern)) {
      this.alertMessage('error', 'Attention', 'Email invalide');
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
        // (error) => {
        //   // Gérer l'échec de l'authentification
        //   console.log("Erreur d'authentification:", error);
        //   this.alertMessage(
        //     'error',
        //     'Erreur',
        //     'Email ou mot de passe incorrect'
        //   );
        // }
        (error) => {
        // Gérer l'échec de l'authentification
        console.log("Erreur d'authentification:", error);
        if (error.status === 401) {
          // Gérer les erreurs spécifiques retournées par le backend
          if (error.error && error.error.message) {
            this.alertMessage('error', 'Erreur', error.error.message);
          } else {
            this.alertMessage(
              'error',
              'Erreur',
              'Email ou mot de passe incorrect'
            );
          }
        } else if (error.status === 403) {
          // L'utilisateur est bloqué, afficher le message d'erreur approprié
          this.alertMessage(
            'error',
            'Erreur',
            "Votre compte est bloqué. Veuillez contacter l'administrateur."
          );
        } else {
          // Gérer les autres erreurs
          this.alertMessage(
            'error',
            'Erreur',
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
          );
        }
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
    this.adresse = '';
    this.telephone = '';
    this.prenom = '';
    this.nom = '';
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
