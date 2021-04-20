import { TestBed } from '@angular/core/testing';

import { VendorTransformService } from './vendor-transform.service';

describe('VendorTransformService', () => {
  let service: VendorTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
