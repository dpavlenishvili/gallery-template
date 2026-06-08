import { InjectionToken } from '@angular/core';

const MIN_LATENCY_MS = 200;
const MAX_LATENCY_MS = 300;

export const SIMULATED_LATENCY = new InjectionToken<() => number>('SIMULATED_LATENCY', {
  providedIn: 'root',
  factory: () => () =>
    MIN_LATENCY_MS + Math.floor(Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS + 1)),
});
