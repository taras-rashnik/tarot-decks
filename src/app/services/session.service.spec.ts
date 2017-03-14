import { TestBed, inject } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('SessionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService]
    });
  });

  it('should ...', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
