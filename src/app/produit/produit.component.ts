import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../models/produits.model';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  constructor(
    private produitService: ProduitsService,
    private router: Router,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/filtre.js';
    document.body.appendChild(script);
    this.loadProduit();
  }
  // Déclaration des variables
  isProgress: boolean = true;
  isTerminate: boolean = false;
  isCancel: boolean = false;
  isAll: boolean = false;

  // Déclaration des méthodes
  // Voir les lignes urbaines
  showProgress() {
    this.isProgress = true;
    this.isTerminate = false;
    this.isCancel = false;
  }

  // Voir les lignes de Terminate
  showTerminate() {
    this.isProgress = false;
    this.isTerminate = true;
    this.isCancel = false;
  }

  // Voir les lignes Cancel
  showCancel() {
    this.isProgress = false;
    this.isTerminate = false;
    this.isCancel = true;
  }
  showAll() {
    this.isProgress = true;
    this.isTerminate = true;
    this.isCancel = true;
  }

  produits: Produit[] = [];

  // Récupération des categories
  loadProduit() {
    this.produitService.getAllsProduitByAdmin().subscribe((data) => {
      console.log('Données des produits:', data);
      this.produits = data.produit;
      console.log('Données des produits:', data);
    });
  }

  addToCart(product: any): void {
    this.panierService.addToCart(product);
  }
}
