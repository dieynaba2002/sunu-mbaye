import { TestBed } from '@angular/core/testing';

import { ProduitsService } from './produits.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';

describe('ProduitsService', () => {
  let service: ProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        DataTablesModule,
        FormsModule,
        HttpClientModule,
      ],
    });
    service = TestBed.inject(ProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
