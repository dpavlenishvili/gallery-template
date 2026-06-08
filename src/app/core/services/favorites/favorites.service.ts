import { computed, inject, Injectable, signal } from '@angular/core';
import { Photo } from '../../models/photo';
import { LocalstorageService } from '../localstorage/localstorage.service';

const STORAGE_KEY = 'photo-library.favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(LocalstorageService);
  private readonly _items = signal<Photo[]>(this.storage.get<Photo[]>(STORAGE_KEY) ?? []);
  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);
  readonly ids = computed<ReadonlySet<string>>(() => new Set(this._items().map((p) => p.id)));

  isFavorite(id: string): boolean {
    return this.ids().has(id);
  }

  add(photo: Photo): void {
    if (!this.isFavorite(photo.id)) {
      this.persist([...this._items(), photo]);
    }
  }

  remove(id: string): void {
    this.persist(this._items().filter((photo) => photo.id !== id));
  }

  toggle(photo: Photo): void {
    if (this.isFavorite(photo.id)) {
      this.remove(photo.id);
    } else {
      this.add(photo);
    }
  }

  private persist(items: Photo[]): void {
    this._items.set(items);
    this.storage.set(STORAGE_KEY, items);
  }
}
