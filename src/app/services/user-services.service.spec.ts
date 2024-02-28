import { TestBed } from '@angular/core/testing';

import { UserServicesService } from './user-services.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';

describe('UserServicesService', () => {
  let service: UserServicesService;

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
    service = TestBed.inject(UserServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
