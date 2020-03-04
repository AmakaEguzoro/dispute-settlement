import { TestBed } from '@angular/core/testing';

import { CgatetransactionService } from './cgatetransaction.service';

describe('CgatetransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CgatetransactionService = TestBed.get(CgatetransactionService);
    expect(service).toBeTruthy();
  });
});
