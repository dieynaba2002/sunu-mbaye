import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  annonces: any[] = [];
  users: any[] = [];
  categories: any[] = [];
  commandes: any[] = [];
  messages: any[] = [];

  email: string = '';
  message: string = '';
  contenue: string = '';
  nom: string = '';
  telephone: string = '';

  constructor(
    private annonceService: AnnoncesService,
    private authService: AuthServiceService,
    private categorieService: CategorieService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
    };

    this.loadAnnonce();
    this.loadCategories();
    this.loadUser();
    this.loadMessages();
  }

  // Récupération des categories
  loadAnnonce() {
    this.annonceService.getAllsAnnonceByAdmin().subscribe((data) => {
      // console.log('Données des annonces:', data);
      this.annonces = data.anonces;
      // console.log('Données des annonces:', data);
    });
  }

  // Récupération des categories
  loadUser() {
    this.authService.getAllsUsersByAdmin().subscribe((data) => {
      // console.log('Données des annonces:', data);
      this.users = data.users;
      // console.log('Données des annonces:', data);
    });
  }

  // Récupération des categories
  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      this.categories = data.categorie;
    });
  }

  loadMessages() {
    this.messageService.getMessages().subscribe((data) => {
      if (data && data.status) {
        if (data.messages) {
          this.messages = data.messages;
        } else {
          console.error(
            "La propriété 'messages' est absente dans la réponse du serveur."
          );
        }
      } else {
        console.error('La réponse du serveur indique un problème :', data);
      }
    });
  }

  CurrentItem: any;
  // Methode pour charger les infos
  chargerInfos(paramItem: any) {
    this.CurrentItem = paramItem;
    this.email = paramItem.email;
    this.message = paramItem.message;
    this.contenue = paramItem.contenue;
  }

  sendReponse() {
    const sendRes = {
      email: this.email,
      contenue: this.contenue,
    };
    console.error(sendRes.email);
    this.messageService.sendResponse(sendRes).subscribe(
      (response) => {
        console.warn('je suis la reponse', response);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
