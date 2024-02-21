import { Component, OnInit } from '@angular/core';
import { AnnoncesService } from 'src/app/services/annonces.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { UserServicesService } from 'src/app/services/user-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css'],
})
export class AccueilAdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor(
    private authService: AuthServiceService,
    private categorieService: CategorieService,
    private annonceService: AnnoncesService,
    private userService: UserServicesService
  ) {}

  users: any[] = [];
  categories: any[] = [];
  annonces: any[] = [];

  roles: any[] = [];

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
    };
    this.loadUser();
    this.loadAnnonce();
    this.loadCategories();
    this.loadRoles();
  }

  // Récupération des categories
  loadUser() {
    this.authService.getAllsUsersByAdmin().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.users = data.users;
      console.log('Données des annonces:', data);
    });
  }

  // Récupération des categories
  loadAnnonce() {
    this.annonceService.getAllsAnnonceByAdmin().subscribe((data) => {
      console.log('Données des annonces:', data);
      this.annonces = data.anonces;
      console.log('Données des annonces:', data);
    });
  }

  // Récupération des categories
  loadCategories() {
    this.categorieService.getAlls().subscribe((data) => {
      // console.log('Données des catégories:', data);
      this.categories = data.categorie;
      // console.log('Données des catégories:', data);
    });
  }

  loadRoles() {
    this.authService.getAllRoles().subscribe((data) => {
      this.roles = data.role;
    });
  }

  getRoleName(role_id: number): string {
    const role = this.roles.find((r) => r.id === role_id);
    return role ? role.nom_role : 'N/A';
  }

  bloquerUtilisateur(id: number): void {
    // Affichez une fenêtre de confirmation avant de bloquer l'utilisateur
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#017D03',
      cancelButtonColor: '#FF9C00',
      confirmButtonText: 'Oui, bloquer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, déterminez le nouvel état de blocage
        const newState = true;

        // Appelez la fonction bloquerUtilisateur avec les deux arguments requis
        this.userService.bloquerUtilisateur(id, newState).subscribe(
          () => {
            // Mettez à jour la liste des utilisateurs après le blocage réussi
            this.loadUser();
            // Affichez un message de succès
            Swal.fire(
              'Utilisateur bloqué!',
              "L'utilisateur a été bloqué avec succès.",
              'success'
            );
          },
          (error) => {
            // Affichez un message d'erreur s'il y a un problème lors du blocage
            Swal.fire(
              'Erreur!',
              "Une erreur est survenue lors du blocage de l'utilisateur.",
              'error'
            );
            console.error("Erreur lors du blocage de l'utilisateur :", error);
          }
        );
      }
    });
  }

  debloquerUtilisateur(id: number): void {
    Swal.fire({
      icon: 'success',
      title: 'Utilisateur débloqué!',
      text: "L'utilisateur a été débloqué avec succès.",
    });

    this.userService.debloquerUtilisateur(id).subscribe(() => {
      this.loadUser();
    });
  }

  toggleBloque(user: any) {
    const newState = !user.bloque;
    this.userService.bloquerUtilisateur(user.id, newState).subscribe(() => {
      user.bloque = newState;
    });
  }

  getActionTitle(user: any): string {
    return user.est_bloquer
      ? "Cliquez pour débloquer l'utilisateur"
      : "Cliquez pour bloquer l'utilisateur";
  }
}
