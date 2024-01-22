import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAgriculteurComponent } from './profil-agriculteur.component';

describe('ProfilAgriculteurComponent', () => {
  let component: ProfilAgriculteurComponent;
  let fixture: ComponentFixture<ProfilAgriculteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilAgriculteurComponent]
    });
    fixture = TestBed.createComponent(ProfilAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
