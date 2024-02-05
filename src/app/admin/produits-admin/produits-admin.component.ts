import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/produits.model';
import { ProduitsService } from 'src/app/services/produits.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produits-admin',
  templateUrl: './produits-admin.component.html',
  styleUrls: ['./produits-admin.component.css'],
})
export class ProduitsAdminComponent implements OnInit {
  constructor(private produitService: ProduitsService) {}

  produits: Produit[] = [];
  tabNewsFilter: any[] = [];
  filterValue: string = "";
  // tabNewsFilter = this.tabNews;
  ngOnInit(): void {
    this.loadProduit();
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
}
