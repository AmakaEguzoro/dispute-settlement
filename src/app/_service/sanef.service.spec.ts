import { TestBed } from '@angular/core/testing';

import { SanefService } from './sanef.service';

describe('SanefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SanefService = TestBed.get(SanefService);
    expect(service).toBeTruthy();
  });
});
