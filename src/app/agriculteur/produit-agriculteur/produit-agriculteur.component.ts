import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { Produit } from 'src/app/models/produits.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitsService } from 'src/app/services/produits.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit-agriculteur',
  templateUrl: './produit-agriculteur.component.html',
  styleUrls: ['./produit-agriculteur.component.css'],
})
export class ProduitAgriculteurComponent implements OnInit {
  constructor(
    private produitService: ProduitsService,
    private categorieService: CategorieService
  ) {}
  ngOnInit(): void {
    this.loadCategories();
    this.loadProduit();
  }

  // Les attributs
  nom_produit: string = '';
  images: any = '';
  quantite: any = '';
  prix: any = '';
  user_id: any;
  categorie_id: any = '';
  description: string = '';

  produits: any[] = [];
  categories: Categorie[] = [];
  seletedProduit: any = {};

  // reacherche
  tabNewsFilter: any[] = [];
  filterValue: string = '';

  // pagination
  pageActuelle: number = 1;
  produitParPage: number = 3;

  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.filterValue = this.filterValue.toLowerCase();
    this.tabNewsFilter = this.produits.filter((elt: any) =>
      elt?.nom_produit.toLowerCase().includes(this.filterValue)
    );
    console.log('je suis le filter', this.tabNewsFilter);
  }

  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      // console.log('Données des catégories:', data);
      this.categories = data.categorie;
      // console.log('Données des catégories:', data);
    });
  }

  // Récupération des produits
  loadProduit() {
    this.produitService.getAllsProduit().subscribe((data) => {
      console.log('Données des produits:', data);
      this.produits = data.produit;
      console.log('Données des produits:', data);
    });
  }

  AjoutProduit() {
    if (this.nom_produit == '') {
      this.produitService.alertMessage(
        'error',
        'Attention',
        'Renseigner un produit'
      );
    } else {
      this.user_id = JSON.parse(localStorage.getItem('userOnline') || '');
      let formData = new FormData();
      formData.append('images', this.images);
      formData.append('nom_produit', this.nom_produit);
      formData.append('quantite', this.quantite);
      formData.append('categorie_id', this.categorie_id);
      formData.append('user_id', this.user_id.id);
      formData.append('description', this.description);
      formData.append('prix', this.prix);
      console.log(formData);
      this.produitService.addProduit(formData).subscribe((response) => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        this.produitService.alertMessage(
          'success',
          'Bravo!',
          'Produit ajouté avec succés'
        );
        this.viderChamps();
        this.loadProduit();
      });
    }
  }

  SupprimerProduit(id: number) {
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
        this.produitService.deleteProduit(id).subscribe(() => {
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

  // fonction pour modifier
  modifierProduit() {
    const data = {
      nom_produit: this.nom_produit,
      description: this.description,
      images: this.images,
      prix: this.prix,
      quantite: this.quantite,
      categorie_id: this.categorie_id,
    };

    console.log('rtyu', this.seletedProduit);
    // console.log(data)
    this.produitService.updateProduit(this.seletedProduit, data)
      .subscribe((response) => {
        console.log(response);
      });
    this.loadProduit();
    console.warn(data);
  }

  chargerInfosProduit(produit: any) {
    this.seletedProduit = produit.id;
    console.log('novysvd', produit);
    this.nom_produit = produit.nom_produit;
    this.description = produit.description;
    this.images = produit.images;
    this.prix = produit.prix;
    this.quantite = produit.quantite;
    this.categorie_id = produit.categorie_id;
  }

  viderChamps() {
    this.nom_produit = '';
    this.images = '';
    this.description = '';
    this.prix = '';
    this.quantite = '';
    this.categorie_id = '';
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.images = event.target.files[0] as File;
  }

  getProduit(produit: any) {
    this.seletedProduit = produit;
  }

  getCategorieName(categorie_id: number): string {
    console.log('ID de catégorie:', categorie_id);
    const categorie = this.categories.find((c) => c.id === categorie_id);
    console.log('Catégorie correspondante:', categorie);
    return categorie ? categorie.nom_categories : 'N/A';
  }

  // pagination
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
