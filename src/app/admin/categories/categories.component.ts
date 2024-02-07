import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategorieService } from 'src/app/services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categorieService: CategorieService,
    private authService: AuthServiceService,
    private annonceService: AnnoncesService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadUser();
    this.loadAnnonce();
  }
  nom_categorie: string = '';
  // categories: Categorie[] = [];
  categories: any[] = [];
  users: any[] = [];
  annonces: any[] = [];

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

  AjoutCategorie() {
    if (this.nom_categorie == '') {
      this.categorieService.alertMessage(
        'error',
        'Attention',
        'Renseigner une categorie'
      );
    } else {
      const newCategorie: Categorie = {
        nom_categories: this.nom_categorie,
      };
      this.categorieService.addCategorie(newCategorie).subscribe(() => {
        this.categorieService.alertMessage(
          'success',
          'Bravo!',
          'Categorie ajouté avec succés'
        );
        this.viderChamps();
        this.loadCategories();
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
        this.categorieService.delete(id).subscribe(() => {
          this.categorieService.alertMessage(
            'success',
            'Supprimé!',
            'Categorie supprimé avec succès'
          );
          this.loadCategories();
        });
      }
    });
  }

  viderChamps() {
    this.nom_categorie = '';
  }
}
