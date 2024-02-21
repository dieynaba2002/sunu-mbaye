import { Component } from '@angular/core';
import { AnnoncesService } from 'src/app/services/annonces.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonce-agriculteur',
  templateUrl: './annonce-agriculteur.component.html',
  styleUrls: ['./annonce-agriculteur.component.css'],
})
export class AnnonceAgriculteurComponent {
  constructor(private annonceService: AnnoncesService) {}
  ngOnInit(): void {
    this.loadAnnonce();
  }
  // Les attributs
  titre: string = '';
  images: any = '';
  user_id: any;
  description: string = '';

  annonces: any[] = [];
  seletedAnnonce: any = {};

  // pagination
  pageActuelle: number = 1;
  annonceParPage: number = 2;

  // recherche
  tabNewsFilter: any[] = [];
  filterValue: string = '';

  // Variables pour faire la vérifications
  verifNomProduit: String = '';
  verifQuantite: String = '';
  verifPrix: String = '';

  // Variables si les champs sont exacts
  exactNomProduit: boolean = false;
  exactQuantite: boolean = false;
  exactPrix: boolean = false;

  // Verification du nom
  verifNomProduitFonction() {
    this.exactNomProduit = false;
    const nomPattern = /^[a-zA-Z][a-zA-Z -]{1,100}$/;
    if (this.titre == '') {
      this.verifNomProduit = 'Veuillez renseigner votre titre';
    } else if (this.titre.length < 2) {
      this.verifNomProduit = 'Le titre est trop court';
    } else if (!this.titre.match(nomPattern)) {
      this.verifNomProduit =
        'Le titre ne dois pas avoir de caractere  speciaux';
    } else {
      this.verifNomProduit = '';
      this.exactNomProduit = true;
    }
    if (this.titre == '') {
      this.verifNomProduit = '';
    }
  }

  // Récupération des categories
  loadAnnonce() {
    this.annonceService.getAllsAnnonces().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.annonces = data.anonces;
      console.log('Données des annonces:', data);
    });
  }

  // detail annonce

  AjoutAnnonce() {
    if (this.titre == '') {
      this.annonceService.alertMessage(
        'error',
        'Attention',
        'Renseigner un produit'
      );
    } else {
      this.user_id = JSON.parse(localStorage.getItem('userOnline') || '');
      let formData = new FormData();
      formData.append('images', this.images);
      formData.append('titre', this.titre);
      formData.append('user_id', this.user_id.id);
      formData.append('description', this.description);
      console.log(formData);
      this.annonceService.addAnnonce(formData).subscribe((response) => {
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        this.annonceService.alertMessage(
          'success',
          'Bravo!',
          'Annonce ajouté avec succés'
        );
        // this.viderChamps();
        this.loadAnnonce();
      });
    }
  }

  SupprimerAnnonce(id: number) {
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
        this.annonceService.deleteAnnonce(id).subscribe(() => {
          this.annonceService.alertMessage(
            'success',
            'Supprimé!',
            'Produit supprimé avec succès'
          );
          this.loadAnnonce();
        });
      }
    });
  }

  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.images = event.target.files[0] as File;
  }

  getAnnonce(annonce: any) {
    this.seletedAnnonce = annonce;
  }

  // fonction pour modifier
  modifierAnnonce() {
    const data = {
      titre: this.titre,
      description: this.description,
      images: this.images,
    };

    console.log('modifAnnonce', this.seletedAnnonce);
    // console.log(data)
    this.annonceService
      .updateAnnonce(this.seletedAnnonce, data)
      .subscribe((response) => {
        console.log(response);
        this.annonceService.alertMessage(
          'success',
          'Succès',
          'Annonce modifiée avec succès'
        );
      });

    this.loadAnnonce();
    console.warn(data);
  }

  chargerInfosAnnonce(annonce: any) {
    this.seletedAnnonce = annonce.id;
    console.log('novysvd', annonce);
    this.titre = annonce.titre;
    this.description = annonce.description;
    this.images = annonce.images;
  }

  onSearch() {
    // Recherche se fait selon le nom ou le prenom
    this.filterValue = this.filterValue.toLowerCase();
    this.tabNewsFilter = this.annonces.filter((elt: any) =>
      elt?.titre.toLowerCase().includes(this.filterValue)
    );
    console.log('je suis le filter', this.tabNewsFilter);
  }

  // pagination
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getAnnoncesPage(): any[] {
    if (!this.annonces) {
      return [];
    }
    const indexDebut = (this.pageActuelle - 1) * this.annonceParPage;
    const indexFin = indexDebut + this.annonceParPage;
    return this.annonces.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    if (
      !this.annonces ||
      this.annonces.length === 0 ||
      this.annonceParPage <= 0
    ) {
      return [];
    }

    const totalPages = Math.ceil(this.annonces.length / this.annonceParPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    if (
      !this.annonces ||
      this.annonces.length === 0 ||
      this.annonceParPage <= 0
    ) {
      return 0;
    }
    return Math.ceil(this.annonces.length / this.annonceParPage);
  }
}
