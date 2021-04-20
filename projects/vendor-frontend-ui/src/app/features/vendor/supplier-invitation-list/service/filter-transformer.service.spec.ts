import { TestBed } from '@angular/core/testing';

import { FilterTransformerService } from './filter-transformer.service';

describe('FilterTransformerService', () => {
  let service: FilterTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
