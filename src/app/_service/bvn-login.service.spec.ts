import { TestBed } from '@angular/core/testing';

import { BvnLoginService } from './bvn-login.service';

describe('BvnLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BvnLoginService = TestBed.get(BvnLoginService);
    expect(service).toBeTruthy();
  });
});
