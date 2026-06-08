import { InjectionToken } from '@angular/core';

export const INTERSECTION_OBSERVER = new InjectionToken<typeof IntersectionObserver>(
  'IntersectionObserver',
  { providedIn: 'root', factory: () => IntersectionObserver },
);
