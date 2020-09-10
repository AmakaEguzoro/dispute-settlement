import { TestBed } from '@angular/core/testing';

import { AgentserviceService } from './agentservice.service';

describe('AgentserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentserviceService = TestBed.get(AgentserviceService);
    expect(service).toBeTruthy();
  });
});
