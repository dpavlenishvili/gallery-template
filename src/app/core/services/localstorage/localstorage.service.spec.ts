import { TestBed } from '@angular/core/testing';

import { BROWSER_STORAGE } from '../../tokens/browser-storage';
import { LocalstorageService } from './localstorage.service';

function fakeStorage(seed: Record<string, string> = {}): Storage {
  const map = new Map<string, string>(Object.entries(seed));
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => void map.set(key, value),
    removeItem: (key) => void map.delete(key),
    clear: () => map.clear(),
    key: (i) => [...map.keys()][i] ?? null,
    get length() {
      return map.size;
    },
  };
}

describe('LocalstorageService', () => {
  function setup(storage: Storage | null): LocalstorageService {
    TestBed.configureTestingModule({
      providers: [{ provide: BROWSER_STORAGE, useValue: storage }],
    });
    return TestBed.inject(LocalstorageService);
  }

  it('round-trips a value through set/get', () => {
    const service = setup(fakeStorage());
    service.set('greeting', { hello: 'world' });

    expect(service.get<{ hello: string }>('greeting')).toEqual({ hello: 'world' });
  });

  it('returns null for a missing key', () => {
    expect(setup(fakeStorage()).get('absent')).toBeNull();
  });

  it('no-ops safely when storage is unavailable (SSR / disabled)', () => {
    const service = setup(null);

    expect(() => service.set('greeting', 1)).not.toThrow();
    expect(service.get('greeting')).toBeNull();
  });
});
