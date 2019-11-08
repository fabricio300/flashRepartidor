import { TestBed } from '@angular/core/testing';

import { GlobalElementService } from './global-element.service';

describe('GlobalElementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalElementService = TestBed.get(GlobalElementService);
    expect(service).toBeTruthy();
  });
});
