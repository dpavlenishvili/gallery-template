import { TestBed } from '@angular/core/testing';

import { SIMULATED_LATENCY } from './simulated-latency';

describe('SIMULATED_LATENCY', () => {
  afterEach(() => vi.restoreAllMocks());

  function delay(): number {
    return TestBed.inject(SIMULATED_LATENCY)();
  }

  it('never resolves faster than the 200ms lower bound', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(delay()).toBe(200);
  });

  it('never resolves slower than the 300ms upper bound', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999999);
    expect(delay()).toBe(300);
  });
});
