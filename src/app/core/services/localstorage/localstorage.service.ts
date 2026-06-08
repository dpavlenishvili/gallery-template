import { inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../../tokens/browser-storage';

@Injectable({ providedIn: 'root' })
export class LocalstorageService {
  private readonly storage = inject(BROWSER_STORAGE);

  get<T>(key: string): T | null {
    const raw = this.storage?.getItem(key);
    return raw == null ? null : (JSON.parse(raw) as T);
  }

  set<T>(key: string, value: T): void {
    this.storage?.setItem(key, JSON.stringify(value));
  }
}
