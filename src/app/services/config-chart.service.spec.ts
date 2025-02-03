import { TestBed } from '@angular/core/testing';

import { ConfigChartService } from './config-chart.service';

describe('ConfigChartService', () => {
  let service: ConfigChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
