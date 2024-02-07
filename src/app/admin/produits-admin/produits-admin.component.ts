import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/produits.model';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitsService } from 'src/app/services/produits.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produits-admin',
  templateUrl: './produits-admin.component.html',
  styleUrls: ['./produits-admin.component.css'],
})
export class ProduitsAdminComponent implements OnInit {
  constructor(
    private produitService: ProduitsService,
    private authService: AuthServiceService,
    private categorieService: CategorieService,
    private annonceService: AnnoncesService
  ) {}

  produits: Produit[] = [];
  tabNewsFilter: any[] = [];
  filterValue: string = '';

  categories: any[] = [];
  users: any[] = [];
  annonces: any[] = [];

  // pagination
  pageActuelle: number = 1;
  produitParPage: number = 3;

  // Récupération des categories
  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      // console.log('Données des catégories:', data);
      this.categories = data.categorie;
      // console.log('Données des catégories:', data);
    });
  }

  // Récupération des categories
  loadUser() {
    this.authService.getAllsUsersByAdmin().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.users = data.users;
      console.log('Données des annonces:', data);
    });
  }

  // Récupération des categories
  loadAnnonce() {
    this.annonceService.getAllsAnnonceByAdmin().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.annonces = data.anonces;
      console.log('Données des annonces:', data);
    });
  }

  // tabNewsFilter = this.tabNews;
  ngOnInit(): void {
    this.loadProduit();
    this.loadCategories();
    this.loadUser();
    this.loadAnnonce();
  }

  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.tabNewsFilter = this.produits.filter((elt: any) =>
      elt?.nom_produit.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  // Récupération des categories
  loadProduit() {
    this.produitService.getAllsProduitByAdmin().subscribe((data) => {
      console.log('Données des produits:', data);
      this.produits = data.produit;
      console.log('Données des produits:', data);
    });
  }

  SupprimerProduitByAdmin(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.deleteProduitByAdmin(id).subscribe(() => {
          this.produitService.alertMessage(
            'success',
            'Supprimé!',
            'Produit supprimé avec succès'
          );
          this.loadProduit();
        });
      }
    });
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
