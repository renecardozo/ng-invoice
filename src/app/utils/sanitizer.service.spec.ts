import { TestBed } from '@angular/core/testing';

import { SanitizerService } from './sanitizer.service';

describe('SanitizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SanitizerService = TestBed.get(SanitizerService);
    expect(service).toBeTruthy();
  });
});
