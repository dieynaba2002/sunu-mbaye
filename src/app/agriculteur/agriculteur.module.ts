import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriculteurRoutingModule } from './agriculteur-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainAgriculteurComponent } from './main-agriculteur/main-agriculteur.component';
import { ProduitAgriculteurComponent } from './produit-agriculteur/produit-agriculteur.component';
import { AnnonceAgriculteurComponent } from './annonce-agriculteur/annonce-agriculteur.component';
import { ProfilAgriculteurComponent } from './profil-agriculteur/profil-agriculteur.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    MainAgriculteurComponent,
    ProduitAgriculteurComponent,
    AnnonceAgriculteurComponent,
    ProfilAgriculteurComponent
  ],
  imports: [
    CommonModule,
    AgriculteurRoutingModule,
    FormsModule,
  ]
})
export class AgriculteurModule { }
