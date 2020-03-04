import { TestBed } from '@angular/core/testing';

import { BvnService } from './bvn.service';

describe('BvnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BvnService = TestBed.get(BvnService);
    expect(service).toBeTruthy();
  });
});
