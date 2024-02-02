import { CanActivateFn, Router } from '@angular/router';

export const agriculteurGuardGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const userConnect = JSON.parse(localStorage.getItem('userOnline') || '');
  if (userConnect) {
    if (userConnect.role_id == 3) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  } else {
    return false;
  }
};
