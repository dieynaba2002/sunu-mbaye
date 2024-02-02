import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { agriculteurGuardGuard } from './agriculteur-guard.guard';

describe('agriculteurGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => agriculteurGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
