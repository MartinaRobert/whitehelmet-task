import { TestBed } from '@angular/core/testing';

import { PetsaleService } from './petsale.service';

describe('PetsaleService', () => {
  let service: PetsaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetsaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
