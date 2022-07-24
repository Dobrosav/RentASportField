import { TestBed } from '@angular/core/testing';

import { SportObjectService } from './sport-object.service';

describe('SportObjectService', () => {
  let service: SportObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
