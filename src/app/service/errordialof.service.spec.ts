import { TestBed } from '@angular/core/testing';

import { ErrordialofService } from './errordialof.service';

describe('ErrordialofService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrordialofService = TestBed.get(ErrordialofService);
    expect(service).toBeTruthy();
  });
});
