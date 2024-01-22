import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { ProduitComponent } from './produit/produit.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanierComponent } from './panier/panier.component';
import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite/politique-de-confidentialite.component';
import { ConditionUtilisationComponent } from './condition-utilisation/condition-utilisation.component';

const routes: Routes = [
  { path: '',redirectTo:'accueil' ,pathMatch:'full'},
  { path: 'accueil', component: AccueilComponent },
  { path: 'apropos', component: AProposComponent },
  { path: 'produits', component: ProduitComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'politique-confidentialite', component: PolitiqueDeConfidentialiteComponent },
  { path: 'condition-utilisation', component: ConditionUtilisationComponent },
  { path: 'admin', loadChildren: () => import ('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'agriculteur', loadChildren: () => import ('./agriculteur/agriculteur.module').then(m => m.AgriculteurModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
