import { TestBed, inject } from '@angular/core/testing';

import { MoConfigService } from './mo-config.service';

describe('MoConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoConfigService]
    });
  });

  it('should be created', inject([MoConfigService], (service: MoConfigService) => {
    expect(service).toBeTruthy();
  }));
});
