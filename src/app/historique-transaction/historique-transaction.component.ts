import { Component, OnInit } from '@angular/core';
import { CommandesService } from '../services/commandes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-historique-transaction',
  templateUrl: './historique-transaction.component.html',
  styleUrls: ['./historique-transaction.component.css'],
})
export class HistoriqueTransactionComponent implements OnInit {
  constructor(
    private commandeService: CommandesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userConnectData = localStorage.getItem('userConnect');
    if (userConnectData) {
      const userConnect = JSON.parse(userConnectData);
      const revendeurId = userConnect.id; // Assurez-vous que le modèle d'utilisateur contient un champ "id"
      this.loadCommandesRevendeur(revendeurId);
    }
  }

  detailCommandes: any[] = [];
  // pagination
  pageActuelle: number = 1;
  produitParPage: number = 10;

  // Récupération des produits
  loadCommandesRevendeur(id: string) {
    this.commandeService
      .getCommandeRevendeur(id)
      .subscribe((detailCommandes) => {
        this.detailCommandes = detailCommandes.details_commande;
      });
  }

  // pagination
  getProduitPage(): any[] {
    if (!this.detailCommandes) {
      return [];
    }
    const indexDebut = (this.pageActuelle - 1) * this.produitParPage;
    const indexFin = indexDebut + this.produitParPage;
    return this.detailCommandes.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    if (
      !this.detailCommandes ||
      this.detailCommandes.length === 0 ||
      this.produitParPage <= 0
    ) {
      return [];
    }

    const totalPages = Math.ceil(
      this.detailCommandes.length / this.produitParPage
    );
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    if (
      !this.detailCommandes ||
      this.detailCommandes.length === 0 ||
      this.produitParPage <= 0
    ) {
      return 0;
    }
    return Math.ceil(this.detailCommandes.length / this.produitParPage);
  }
}
