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
  detailCommandes: any[] = [];

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
      this.annonces = data.anonces;
    });
  }

  // Récupération des categories
  loadUser() {
    this.authService.getAllsUsersByAdmin().subscribe((data) => {
      this.users = data.users;
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
      this.commandes = data.commandes;
      // console.log('bonjour des commandes:', data);
    });
  }

  loadDetailCommande(commandeId: number) {
    this.commandeService.getDetailsCommande(commandeId).subscribe((data) => {
      this.detailCommandes = data.details_commande;
      console.log(
        'Détails de la commande',
        commandeId,
        ':',
        data.details_commande
      );
    });
  }

  calculateSubtotal(detailCommandes: any[]): number {
    let subtotal = 0;
    detailCommandes.forEach((detail) => {
      subtotal += detail.prix_total;
    });
    return subtotal;
  }

  annulerCommande(commandeId: number) {
    this.commandeService.annulerCommande(commandeId).subscribe(() => {
      this.loadCommande();
    });
  }

  terminerCommande(commandeId: number) {
    this.commandeService.terminerCommande(commandeId).subscribe(() => {
      this.loadCommande();
    });
  }
}
