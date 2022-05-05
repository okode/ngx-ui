import { TestBed } from '@angular/core/testing';

import { NgxUiService } from './ngx-ui.service';

describe('NgxUiService', () => {
  let service: NgxUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
