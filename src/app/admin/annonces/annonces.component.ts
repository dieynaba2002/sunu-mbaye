import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css'],
})
export class AnnoncesComponent implements OnInit {
  annonces: any[] = [];
  users: any[] = [];
  categories: any[] = [];

  constructor(
    private annonceService: AnnoncesService,
    private authService: AuthServiceService,
    private categorieService: CategorieService
  ) {}
  ngOnInit(): void {
    this.loadAnnonce();
    this.loadUser();
    this.loadCategories();
  }

  // Récupération des categories
  loadAnnonce() {
    this.annonceService.getAllsAnnonceByAdmin().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.annonces = data.anonces;
      console.log('Données des annonces:', data);
    });
  }

  // Récupération des categories
  loadUser() {
    this.authService.getAllsUsersByAdmin().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.users = data.user;
      console.log('Données des annonces:', data);
    });
  }

  // Récupération des categories
  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      // console.log('Données des catégories:', data);
      this.categories = data.categorie;
      // console.log('Données des catégories:', data);
    });
  }

  // publierAnnonce(annonceId: number) {
  //   this.annonceService.PublierAnnonceByAdmin(annonceId);

  //   // Vous pouvez également afficher un message de succès si nécessaire
  //   this.annonceService.alertMessage(
  //     'success',
  //     'Succès',
  //     'Annonce publiée avec succès.'
  //   );
  // }
}
