import { TestBed } from '@angular/core/testing';

import { GtagService } from './gtag.service';

describe('GtagService', () => {
  let service: GtagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
