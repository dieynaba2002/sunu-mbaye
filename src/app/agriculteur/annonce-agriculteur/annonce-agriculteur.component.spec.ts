import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceAgriculteurComponent } from './annonce-agriculteur.component';

describe('AnnonceAgriculteurComponent', () => {
  let component: AnnonceAgriculteurComponent;
  let fixture: ComponentFixture<AnnonceAgriculteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceAgriculteurComponent]
    });
    fixture = TestBed.createComponent(AnnonceAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
