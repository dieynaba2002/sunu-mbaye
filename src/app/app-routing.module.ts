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
import { InformationProfilComponent } from './information-profil/information-profil.component';
import { ModificationProfilComponent } from './modification-profil/modification-profil.component';
import { HistoriqueTransactionComponent } from './historique-transaction/historique-transaction.component';
import { authGuard } from './guard/auth.guard';
import { agriculteurGuardGuard } from './guard/agriculteur-guard.guard';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'apropos', component: AProposComponent },
  { path: 'produits', component: ProduitComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'panier', component: PanierComponent },
  {
    path: 'politique-confidentialite',
    component: PolitiqueDeConfidentialiteComponent,
  },
  { path: 'condition-utilisation', component: ConditionUtilisationComponent },
  { path: 'information-profil', component: InformationProfilComponent },
  { path: 'modification-profil', component: ModificationProfilComponent },
  { path: 'historique-transaction', component: HistoriqueTransactionComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },
  {
    path: 'agriculteur',
    loadChildren: () =>
      import('./agriculteur/agriculteur.module').then(
        (m) => m.AgriculteurModule
      ),
    canActivate: [agriculteurGuardGuard],
  },
  { path: '**', component: MaintenanceComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
