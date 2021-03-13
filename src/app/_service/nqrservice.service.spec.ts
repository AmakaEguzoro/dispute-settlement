import { TestBed } from '@angular/core/testing';

import { NqrserviceService } from './nqrservice.service';

describe('NqrserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NqrserviceService = TestBed.get(NqrserviceService);
    expect(service).toBeTruthy();
  });
});
