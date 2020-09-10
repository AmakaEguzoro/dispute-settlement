import { TestBed } from '@angular/core/testing';

import { TransactionglobalService } from './transactionglobal.service';

describe('TransactionglobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionglobalService = TestBed.get(TransactionglobalService);
    expect(service).toBeTruthy();
  });
});
