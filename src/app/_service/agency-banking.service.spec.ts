import { TestBed } from '@angular/core/testing';

import { AgencyBankingService } from './agency-banking.service';

describe('AgencyBankingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgencyBankingService = TestBed.get(AgencyBankingService);
    expect(service).toBeTruthy();
  });
});
