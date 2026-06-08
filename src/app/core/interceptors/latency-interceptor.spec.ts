import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SIMULATED_LATENCY } from '../tokens/simulated-latency';
import { latencyInterceptor } from './latency-interceptor';

describe('latencyInterceptor', () => {
  const FIXED_LATENCY = 250;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SIMULATED_LATENCY, useValue: () => FIXED_LATENCY }],
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays the response by the value from SIMULATED_LATENCY', () => {
    const req = new HttpRequest('GET', '/photos');
    const next: HttpHandlerFn = () => of(new HttpResponse({ status: 200 }));

    let emitted = false;
    TestBed.runInInjectionContext(() => latencyInterceptor(req, next)).subscribe(() => {
      emitted = true;
    });

    vi.advanceTimersByTime(FIXED_LATENCY - 1);
    expect(emitted).toBe(false);

    vi.advanceTimersByTime(1);
    expect(emitted).toBe(true);
  });
});
