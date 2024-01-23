import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationProfilComponent } from './modification-profil.component';

describe('ModificationProfilComponent', () => {
  let component: ModificationProfilComponent;
  let fixture: ComponentFixture<ModificationProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificationProfilComponent]
    });
    fixture = TestBed.createComponent(ModificationProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
