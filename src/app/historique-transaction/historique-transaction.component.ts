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

  // Récupération des produits
  loadCommandesRevendeur(id: string) {
    this.commandeService.getCommandeRevendeur(id).subscribe((detailCommandes) => {
      this.detailCommandes = detailCommandes.details_commande;
    });
  }
}
