import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { ProduitComponent } from './produit/produit.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { DataTablesModule } from 'angular-datatables';
import { PanierComponent } from './panier/panier.component';
import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite/politique-de-confidentialite.component';
import { ConditionUtilisationComponent } from './condition-utilisation/condition-utilisation.component';
import { InformationProfilComponent } from './information-profil/information-profil.component';
import { ModificationProfilComponent } from './modification-profil/modification-profil.component';
import { HistoriqueTransactionComponent } from './historique-transaction/historique-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    AProposComponent,
    ProduitComponent,
    ContactComponent,
    AuthComponent,
    PanierComponent,
    PolitiqueDeConfidentialiteComponent,
    ConditionUtilisationComponent,
    InformationProfilComponent,
    ModificationProfilComponent,
    HistoriqueTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
