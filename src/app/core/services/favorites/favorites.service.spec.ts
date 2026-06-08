import { TestBed } from '@angular/core/testing';

import { Photo } from '../../models/photo';
import { BROWSER_STORAGE } from '../../tokens/browser-storage';
import { FavoritesService } from './favorites.service';

const STORAGE_KEY = 'photo-library.favorites';

function photo(id: string): Photo {
  return {
    id,
    author: `Author ${id}`,
    width: 100,
    height: 100,
    url: 'u',
    download_url: `https://picsum.photos/id/${id}/100/100`,
  };
}

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

describe('FavoritesService', () => {
  function setup(storage: Storage): FavoritesService {
    TestBed.configureTestingModule({
      providers: [{ provide: BROWSER_STORAGE, useValue: storage }],
    });
    return TestBed.inject(FavoritesService);
  }

  it('adds a photo (idempotently) and reflects it in items/ids/count', () => {
    const favorites = setup(fakeStorage());
    favorites.add(photo('1'));
    favorites.add(photo('1'));

    expect(favorites.count()).toBe(1);
    expect(favorites.isFavorite('1')).toBe(true);
    expect(favorites.items().map((p) => p.id)).toEqual(['1']);
  });

  it('removes a photo', () => {
    const favorites = setup(fakeStorage());
    favorites.add(photo('1'));
    favorites.remove('1');

    expect(favorites.isFavorite('1')).toBe(false);
    expect(favorites.count()).toBe(0);
  });

  it('toggle adds when absent and removes when present', () => {
    const favorites = setup(fakeStorage());
    favorites.toggle(photo('2'));
    expect(favorites.isFavorite('2')).toBe(true);
    favorites.toggle(photo('2'));
    expect(favorites.isFavorite('2')).toBe(false);
  });

  it('persists changes to storage (DR-4)', () => {
    const storage = fakeStorage();
    setup(storage).add(photo('3'));

    expect(JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]')).toEqual([photo('3')]);
  });

  it('hydrates from storage on creation (survives a refresh)', () => {
    const storage = fakeStorage({ [STORAGE_KEY]: JSON.stringify([photo('9')]) });
    const favorites = setup(storage);

    expect(favorites.isFavorite('9')).toBe(true);
    expect(favorites.count()).toBe(1);
  });
});
