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
  }

  // Les attributs
  nom_produit: string = '';
  images: any = '';
  quantite: string = '';
  prix: string = '';
  user_id: any;
  categorie_id: string = '';
  description: string = '';

  produits: any[] = [];
  categories: Categorie[] = [];

  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      console.log('Données des catégories:', data);
      this.categories = data.categorie;
      console.log('Données des catégories:', data);
    });
  }

  // Récupération des categories
  loadProduit() {
    this.produitService.getAllsProduit().subscribe((data) => {
      console.log('Données des produit:', data);
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
      // const newProduit: Produit = {
      //   nom_produit: this.nom_produit,
      //   images: this.images,
      //   quantite: this.quantite,
      //   prix: this.prix,
      //   user_id: this.user_id,
      //   categorie_id: this.categorie_id,
      //   description: this.description
      // };

      this.user_id = JSON.parse(localStorage.getItem('userOnline') || '');
      let formData = new FormData();
      formData.append('image', this.images);
      formData.append('nom_produit', this.nom_produit);
      formData.append('quantite', this.quantite);
      formData.append('categorie_id', this.categorie_id);
      formData.append('user_id', this.user_id.id);
      formData.append('description', this.description);
      formData.append('prix', this.prix);
      console.log(formData);
      this.produitService.addProduit(formData).subscribe(() => {
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

  SupprimerCategorie(id: number) {
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
            'Categorie supprimé avec succès'
          );
          this.loadProduit();
        });
      }
    });
  }

  viderChamps() {
    this.nom_produit = '';
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.images = event.target.files[0] as File;
  }
}
