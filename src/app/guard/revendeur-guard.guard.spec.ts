import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { revendeurGuardGuard } from './revendeur-guard.guard';

describe('revendeurGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => revendeurGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
