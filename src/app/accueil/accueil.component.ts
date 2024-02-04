import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from '../services/annonces.service';
import { Annonce } from '../models/annonces.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {
  annoncesPubliees: Annonce[] = [];

  constructor(private annonceService: AnnoncesService) {}
  ngOnInit(): void {
    localStorage.setItem('userOnline', JSON.stringify([]));
    // this.loadAnnoncesPubliees();
  }

  // loadAnnoncesPubliees() {
  //   this.annoncesPubliees = this.annonceService.annonces.filter(
  //     (annonce) => annonce.publiee
  //   );
  // }
}
