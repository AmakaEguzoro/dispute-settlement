import { TestBed } from '@angular/core/testing';

import { ErrorAnalysisService } from './error-analysis.service';

describe('ErrorAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorAnalysisService = TestBed.get(ErrorAnalysisService);
    expect(service).toBeTruthy();
  });
});
