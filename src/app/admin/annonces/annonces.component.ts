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
  annoncesPubliees: any[] = [];

  constructor(
    private annonceService: AnnoncesService,
    private authService: AuthServiceService,
    private categorieService: CategorieService
  ) {}
  ngOnInit(): void {
    this.loadAnnonce();
    this.loadUser();
    this.loadCategories();
    // this.loadAnnoncePubliee();
  }

  // Récupération des categories
  loadAnnonce() {
    this.annonceService.getAllsAnnonceByAdmin().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.annonces = data.anonces;
      console.log('Données des annonces:', data);
    });
  }

  loadAnnoncePubliee() {
    this.annonceService.getAllspublishAnnonceByAdmin().subscribe((data) => {
      console.log('Données des annonces publish:', data);
      this.annonces = data.annoncesPubliees;
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
  // publier annonce pour l'admin
  publierAnnonce(id: number): void {
    this.annonceService.publierAnnonceByAdmin(id).subscribe((response) => {
      if (response && response.status) {
        // Gérer la réponse de réussite (si nécessaire)
        console.log('Annonce publiée avec succès');
      } else {
        // Gérer la réponse d'échec (si nécessaire)
        console.error("Erreur lors de la publication de l'annonce");
      }
    });
  }

  retirerAnnonce(annonceId: number) {
  this.annonceService.deleteAnnonceByAdmin(annonceId).subscribe(
    (response) => {
      this.annonceService.alertMessage(
        'success',
        'Succès!',
        'Annonce retirée avec succès.'
      );
      // Actualisez la liste des annonces après le retrait
      this.loadAnnoncePubliee();
    },
    (error) => {
      console.error('Erreur lors du retrait de l\'annonce', error);
      this.annonceService.alertMessage(
        'error',
        'Erreur!',
        'Une erreur est survenue lors du retrait de l\'annonce.'
      );
    }
  );
}

}
