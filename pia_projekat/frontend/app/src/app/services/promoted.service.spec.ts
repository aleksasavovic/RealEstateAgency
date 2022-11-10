import { TestBed } from '@angular/core/testing';

import { PromotedService } from './promoted.service';

describe('PromotedService', () => {
  let service: PromotedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
