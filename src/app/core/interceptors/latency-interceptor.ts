import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';
import { inject } from '@angular/core';
import { SIMULATED_LATENCY } from '../tokens/simulated-latency';

export const latencyInterceptor: HttpInterceptorFn = (req, next) => {
  const latency = inject(SIMULATED_LATENCY);
  return next(req).pipe(delay(latency()));
};
