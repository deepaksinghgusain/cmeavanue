import { TestBed } from '@angular/core/testing';

import { LandingpageService } from './common.service';

describe('LandingpageService', () => {
  let service: LandingpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
