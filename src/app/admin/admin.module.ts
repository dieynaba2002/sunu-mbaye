import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CategoriesComponent } from './categories/categories.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { AnnoncesComponent } from './annonces/annonces.component';
import { ProfilComponent } from './profil/profil.component';
import { CommandeComponent } from './commande/commande.component';
import { ProduitsAdminComponent } from './produits-admin/produits-admin.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    CategoriesComponent,
    AccueilAdminComponent,
    AnnoncesComponent,
    ProfilComponent,
    CommandeComponent,
    ProduitsAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
