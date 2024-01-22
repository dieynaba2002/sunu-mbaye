import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAgriculteurComponent } from './main-agriculteur.component';

describe('MainAgriculteurComponent', () => {
  let component: MainAgriculteurComponent;
  let fixture: ComponentFixture<MainAgriculteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainAgriculteurComponent]
    });
    fixture = TestBed.createComponent(MainAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
