import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CategoriesComponent } from './categories/categories.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { CommandeComponent } from './commande/commande.component';
import { ProfilComponent } from './profil/profil.component';
import { ProduitsAdminComponent } from './produits-admin/produits-admin.component';
import { authGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'dasboard-admin', component: AccueilAdminComponent },
      { path: 'produits-admin', component: ProduitsAdminComponent },
      { path: 'annonces', component: AnnoncesComponent },
      { path: 'commandes', component: CommandeComponent },
      { path: 'profil', component: ProfilComponent },
      { path: '', redirectTo: 'dasboard-admin', pathMatch: 'full' }
      
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
