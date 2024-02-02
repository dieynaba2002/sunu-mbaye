import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/produits.model';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-produits-admin',
  templateUrl: './produits-admin.component.html',
  styleUrls: ['./produits-admin.component.css'],
})
export class ProduitsAdminComponent implements OnInit{
  constructor(private produitService: ProduitsService) {}

  produits: Produit[] = [];

  // Récupération des categories
  loadProduit() {
    this.produitService.getAllsProduitByAdmin().subscribe((data) => {
      console.log('Données des produits:', data);
      this.produits = data.produit;
      console.log('Données des produits:', data);
    });
  }

  ngOnInit(): void {
    this.loadProduit();
  }
}
