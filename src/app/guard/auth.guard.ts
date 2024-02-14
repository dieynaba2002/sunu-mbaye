import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = new Router();

  const accessToken = localStorage.getItem('access_token');

  // Vérifier si le token d'authentification est présent dans le local storage
  if (!accessToken) {
    // Si le token n'existe pas, rediriger l'utilisateur vers la page de connexion
    router.navigate(['login']);
    return false;
  }
  const userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
  if (userConnect.role_id == 1) {
    return true;
  }
  else {
    router.navigate(['login']);
    return false;
  }
};
  