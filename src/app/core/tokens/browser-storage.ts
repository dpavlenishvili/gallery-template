import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage | null>('BROWSER_STORAGE', {
  providedIn: 'root',
  factory: () => (typeof localStorage === 'undefined' ? null : localStorage),
});
