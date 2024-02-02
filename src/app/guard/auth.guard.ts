import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = new Router();
  const userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
  if (userConnect.role_id == 1) {
    return true;
  }
  else {
    router.navigate(['login']);
    return false;
  }
};
  