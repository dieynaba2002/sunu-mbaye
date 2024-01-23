import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueTransactionComponent } from './historique-transaction.component';

describe('HistoriqueTransactionComponent', () => {
  let component: HistoriqueTransactionComponent;
  let fixture: ComponentFixture<HistoriqueTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueTransactionComponent]
    });
    fixture = TestBed.createComponent(HistoriqueTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
