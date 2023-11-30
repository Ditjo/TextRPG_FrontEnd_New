import { TestBed } from '@angular/core/testing';

import { ArmourService } from './armour.service';

describe('ArmourService', () => {
  let service: ArmourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
