import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/filtre.js';
    document.body.appendChild(script);
  }
  // Déclaration des variables
  isProgress:boolean = true;
  isTerminate:boolean = false;
  isCancel: boolean = false;
  isAll: boolean = false;


  // Déclaration des méthodes
  // Voir les lignes urbaines
  showProgress(){
    this.isProgress = true;
    this.isTerminate = false;
    this.isCancel = false;
  }

  // Voir les lignes de Terminate
  showTerminate(){
    this.isProgress = false;
    this.isTerminate = true;
    this.isCancel = false;
  }

  // Voir les lignes Cancel
  showCancel(){
    this.isProgress = false;
    this.isTerminate = false;
    this.isCancel = true;
  }
  showAll() {
    this.isProgress = true;
    this.isTerminate = true;
    this.isCancel = true;
  }

}
