import { TestBed } from '@angular/core/testing';

import { UserModalService } from './user-modal.service';

describe('UserModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserModalService = TestBed.get(UserModalService);
    expect(service).toBeTruthy();
  });
});
