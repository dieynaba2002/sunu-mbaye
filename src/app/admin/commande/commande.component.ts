import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { CommandesService } from 'src/app/services/commandes.service';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  annonces: any[] = [];
  users: any[] = [];
  categories: any[] = [];
  commandes: any[] = [];

  constructor(
    private annonceService: AnnoncesService,
    private authService: AuthServiceService,
    private categorieService: CategorieService,
    private commandeService: CommandesService
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
    this.loadCommande();
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

  loadCommande() {
    this.commandeService.getAllComandes().subscribe((data) => {
      this.commandes = data.detailCommende;
      console.log('bonjour des commandes:', data);
    });
  }
}
