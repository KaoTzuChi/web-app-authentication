import { TestBed } from '@angular/core/testing';

import { UserLogoutService } from './user.logout.service';

describe('UserLogoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserLogoutService = TestBed.get(UserLogoutService);
    expect(service).toBeTruthy();
  });
});
