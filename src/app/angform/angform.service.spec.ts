import { TestBed, inject } from '@angular/core/testing';

import { AngformService } from './angform.service';

describe('AngformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngformService]
    });
  });

  it('should be created', inject([AngformService], (service: AngformService) => {
    expect(service).toBeTruthy();
  }));
});
