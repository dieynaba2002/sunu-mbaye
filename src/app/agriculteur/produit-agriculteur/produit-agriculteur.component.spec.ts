import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAgriculteurComponent } from './produit-agriculteur.component';

describe('ProduitAgriculteurComponent', () => {
  let component: ProduitAgriculteurComponent;
  let fixture: ComponentFixture<ProduitAgriculteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitAgriculteurComponent]
    });
    fixture = TestBed.createComponent(ProduitAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
