import { TestBed } from '@angular/core/testing';

import { McashterminalsService } from './mcashterminals.service';

describe('McashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: McashterminalsService = TestBed.get(McashterminalsService);
    expect(service).toBeTruthy();
  });
});
