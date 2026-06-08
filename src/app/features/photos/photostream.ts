import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotoService } from '../../core/services/photo/photo.service';
import { Photo } from '../../core/models/photo';

type StreamStatus = 'loading' | 'error' | 'ready';

const PAGE_SIZE = 20;

@Injectable()
export class Photostream {
  private readonly photoService = inject(PhotoService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _photos = signal<Photo[]>([]);
  private readonly _status = signal<StreamStatus>('ready');

  readonly photos = this._photos.asReadonly();
  readonly status = this._status.asReadonly();

  private page = 1;
  private reachedEnd = false;

  loadMore(): void {
    if (this._status() === 'loading' || this.reachedEnd) return;
    this._status.set('loading');

    this.photoService
      .loadPhotos(this.page, PAGE_SIZE)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (batch) => {
          this._photos.update((current) => [...current, ...batch]);
          this.page++;
          this.reachedEnd = batch.length < PAGE_SIZE;
          this._status.set('ready');
        },
        error: () => this._status.set('error'),
      });
  }
}
