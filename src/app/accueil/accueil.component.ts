import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from '../services/annonces.service';
import { Annonce } from '../models/annonces.model';
import { Produit } from '../models/produits.model';
import { ProduitsService } from '../services/produits.service';
import { PanierService } from '../services/panier.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  annonces: any[] = [];
  users: any[] = [];
  categories: any[] = [];
  annoncesPubliees: any[] = [];
  produits: Produit[] = [];
  seletedProduit: any = {};
  seletedAnnonce: any = {};

  constructor(
    private annonceService: AnnoncesService,
    private produitService: ProduitsService,
    private panierService: PanierService
  ) {}
  ngOnInit(): void {
    // localStorage.setItem('userOnline', JSON.stringify([]));
    this.loadAnnoncePubliee();
    this.loadProduit();
    this.loadProduitWithUserDetails();
    // this.loadAnnoncesPubliees();
  }

  // loadAnnoncePubliee() {
  //   this.annonceService.getAllspublishAnnonceByAdmin().subscribe((data) => {
  //     console.log('Données des annonces publish:', data);
  //     this.annoncesPubliees = data.annoncesPubliees;
  //     console.log('Données des annonces:', data);
  //   });
  //   this.annoncesPubliees.forEach((annonce) => {
  //     this.produitService.getUserDetails(annonce.user_id).subscribe((userDetails) => {
  //         annonce.user = userDetails;
  //         // Ajoutez une propriété 'user_nom' au produit pour stocker le nom de l'utilisateur
  //         annonce.user_nom = userDetails
  //           ? `${userDetails.prenom} ${userDetails.nom}`
  //           : 'N/A';
  //           console.log('test',userDetails);
  //     });
  //   });
  // }

  loadAnnoncePubliee() {
    this.annonceService.getAllspublishAnnonceByAdmin().subscribe((data) => {
      console.log('Données des annonces publish:', data);
      this.annoncesPubliees = data.annoncesPubliees;
      console.log('Données des annonces:', data);

      // Créez un tableau d'observables pour récupérer les détails de tous les utilisateurs
      const userObservables = this.annoncesPubliees.map((annonce) => {
        return this.produitService.getUserDetails(annonce.user_id);
      });

      // Utilisez forkJoin pour attendre que toutes les requêtes soient terminées
      forkJoin(userObservables).subscribe((userDetailsArray) => {
        userDetailsArray.forEach((userDetails, index) => {
          const annonce = this.annoncesPubliees[index];
          annonce.user = userDetails;
          // Ajoutez une propriété 'user_nom' à l'annonce pour stocker le nom de l'utilisateur
          annonce.user_nom = userDetails ? `${userDetails.nom} ${userDetails.prenom}` : 'N/A';
          annonce.user_telephone = userDetails ? userDetails.telephone : 'N/A';
          console.log('test', userDetails);
        });
      });
    });
  }

  getThreeProducts(): Produit[] {
    return this.produits.slice(0, 3);
  }

  addToCart(product: any): void {
    this.panierService.addToCart(product);
  }

  // fonction qui recupere l'utilisateur associer a son produit
  loadProduitWithUserDetails() {
    this.produitService.getAllsProduitByAdmin().subscribe((data) => {
      console.log('Données des produits qwert:', data);
      this.produits = data.produit;
      // Mettez à jour chaque produit avec les détails de l'utilisateur
      this.produits.forEach((produit) => {
        this.produitService
          .getUserDetails(produit.user_id)
          .subscribe((userDetails) => {
            produit.user = userDetails;
            // Ajoutez une propriété 'user_nom' au produit pour stocker le nom de l'utilisateur
            produit.user_nom = userDetails
              ? `${userDetails.prenom} ${userDetails.nom}`
              : 'N/A';
          });
      });
    });
  }
  loadProduit() {
    this.produitService.getAllsProduitByAdmin().subscribe((data) => {
      this.produits = data.produit;
      console.log('Données des prod:', data);
      this.produits.sort(() => Math.random() - 0.5);
      this.produits = this.getThreeProducts();
    });
  }

  getProduit(produit: any) {
    this.seletedProduit = produit;
    console.log('im sle', produit);
  }

  getAnnonce(annonce: any) {
    this.seletedAnnonce = annonce;
    console.log(annonce);
  }
}
