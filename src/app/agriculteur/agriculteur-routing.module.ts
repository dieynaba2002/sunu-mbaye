import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAgriculteurComponent } from './main-agriculteur/main-agriculteur.component';
import { ProduitAgriculteurComponent } from './produit-agriculteur/produit-agriculteur.component';
import { AnnonceAgriculteurComponent } from './annonce-agriculteur/annonce-agriculteur.component';
import { ProfilAgriculteurComponent } from './profil-agriculteur/profil-agriculteur.component';

const routes: Routes = [
  {
    path: '', component: MainAgriculteurComponent, children: [
      { path: 'produit-agriculteur', component: ProduitAgriculteurComponent },
      { path: 'annonce-agriculteur', component: AnnonceAgriculteurComponent },
      { path: 'profil-agriculteur', component: ProfilAgriculteurComponent },
      { path: '',redirectTo:'produit-agriculteur' ,pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriculteurRoutingModule { }
