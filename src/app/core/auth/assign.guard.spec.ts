import { TestBed } from '@angular/core/testing';

import { AssignGuard } from './assign.guard';

describe('AssignGuard', () => {
  let guard: AssignGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssignGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
