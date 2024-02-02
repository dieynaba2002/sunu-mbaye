import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadCategories();
  }
  nom_categorie: string = '';
  // categories: Categorie[] = [];
  categories: any[] = [];

  // Récupération des categories
  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      // console.log('Données des catégories:', data);
      this.categories = data.categorie;
      // console.log('Données des catégories:', data);
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

