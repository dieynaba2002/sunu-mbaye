import { TestBed } from '@angular/core/testing';

import { AnnoncesService } from './annonces.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

describe('AnnoncesService', () => {
  let service: AnnoncesService;

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
    service = TestBed.inject(AnnoncesService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
