import { TestBed, inject } from '@angular/core/testing';

import { DecksService } from './decks.service';

describe('DecksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecksService]
    });
  });

  it('should ...', inject([DecksService], (service: DecksService) => {
    expect(service).toBeTruthy();
  }));
});
