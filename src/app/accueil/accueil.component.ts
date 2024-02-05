import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from '../services/annonces.service';
import { Annonce } from '../models/annonces.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  annonces: any[] = [];
  users: any[] = [];
  categories: any[] = [];
  annoncesPubliees: any[] = [];

  constructor(private annonceService: AnnoncesService) {}
  ngOnInit(): void {
    localStorage.setItem('userOnline', JSON.stringify([]));
    this.loadAnnoncePubliee();
    // this.loadAnnoncesPubliees();
  }

  loadAnnoncePubliee() {
    this.annonceService.getAllspublishAnnonceByAdmin().subscribe((data) => {
      console.log('Données des annonces publish:', data);
      this.annoncesPubliees = data.annoncesPubliees;
      console.log('Données des annonces:', data);
    });
  }
}
