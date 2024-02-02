import { CanActivateFn, Router } from '@angular/router';

export const revendeurGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
  if (userConnect.role_id == 2) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
