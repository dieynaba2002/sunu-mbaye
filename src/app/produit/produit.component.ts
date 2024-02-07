import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../models/produits.model';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../services/apiUrl';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit {
  constructor(
    private produitService: ProduitsService,
    private router: Router,
    private panierService: PanierService,
    private http: HttpClient,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/filtre.js';
    document.body.appendChild(script);
    this.loadProduit();
    this.loadProduitWithUserDetails();
    this.loadCategories();
    this.selectedCategory = 'Tout';
  }

  produits: Produit[] = [];
  categories: any[] = [];
  allProduits: Produit[] = [];
  selectedCategory: string | null = null;

  // pagination
  pageActuelle: number = 1;
  produitParPage: number = 12;

  // recherche
  tabNewsFilter: any[] = [];
  filterValue: string = '';

  // Récupération des categories
  loadProduit() {
    this.produitService.getAllsProduitByAdmin().subscribe((data) => {
      this.produits = data.produit;
      this.allProduits = data.produit;
    });
  }

  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      this.categories = data.categorie;
      console.log('my categ', data);
    });
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

  filterByCategory(categorie: string | null): void {
    // Mettre à jour la catégorie sélectionnée
    this.selectedCategory = categorie;
    console.log('test', this.selectedCategory);

    if (categorie === null || categorie === 'Tout') {
      // Si la catégorie est null ou 'Tout', charger tous les produits
      this.produits = [...this.allProduits];
    } else {
      // Filtrer les produits par la catégorie sélectionnée
      this.produits = this.allProduits.filter((produit: any) => {
        return produit.categorie_id.toString() == categorie.toString();
      });
    }
  }

  // recherche

  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.filterValue = this.filterValue.toLowerCase();
    this.tabNewsFilter = this.produits.filter((elt: any) =>
      elt?.nom_produit.toLowerCase().includes(this.filterValue)
    );
    console.log('je suis le filter', this.tabNewsFilter);
  }

  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getProduitPage(): any[] {
    if (!this.produits) {
      return [];
    }
    const indexDebut = (this.pageActuelle - 1) * this.produitParPage;
    const indexFin = indexDebut + this.produitParPage;
    return this.produits.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    if (
      !this.produits ||
      this.produits.length === 0 ||
      this.produitParPage <= 0
    ) {
      return [];
    }

    const totalPages = Math.ceil(this.produits.length / this.produitParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    if (
      !this.produits ||
      this.produits.length === 0 ||
      this.produitParPage <= 0
    ) {
      return 0;
    }
    return Math.ceil(this.produits.length / this.produitParPage);
  }
}
