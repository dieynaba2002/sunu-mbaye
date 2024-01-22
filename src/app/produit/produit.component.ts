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
}
