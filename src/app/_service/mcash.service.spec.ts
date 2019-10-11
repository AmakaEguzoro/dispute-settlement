import { TestBed } from '@angular/core/testing';

import { McashService } from './mcash.service';

describe('McashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: McashService = TestBed.get(McashService);
    expect(service).toBeTruthy();
  });
});
