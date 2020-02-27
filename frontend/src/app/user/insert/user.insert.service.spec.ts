import { TestBed } from '@angular/core/testing';

import { UserInsertService } from './user.insert.service';

describe('UserInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserInsertService = TestBed.get(UserInsertService);
    expect(service).toBeTruthy();
  });
});
