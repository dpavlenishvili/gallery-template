import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Photostream } from './photostream';
import { PhotoService } from '../../core/services/photo/photo.service';
import { Photo } from '../../core/models/photo';

function batch(n: number, offset = 0): Photo[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `${offset + i}`,
    author: 'A',
    width: 10,
    height: 10,
    url: 'u',
    download_url: `https://picsum.photos/id/${offset + i}/10/10`,
  }));
}

describe('Photostream', () => {
  function make(service: Partial<PhotoService>): Photostream {
    TestBed.configureTestingModule({
      providers: [Photostream, { provide: PhotoService, useValue: service }],
    });
    return TestBed.inject(Photostream);
  }

  it('appends a full batch and stays ready', () => {
    const stream = make({ loadPhotos: () => of(batch(20)) });
    stream.loadMore();
    expect(stream.photos().length).toBe(20);
    expect(stream.status()).toBe('ready');
  });

  it('accumulates across pages', () => {
    let call = 0;
    const stream = make({ loadPhotos: () => of(batch(20, call++ * 20)) });
    stream.loadMore();
    stream.loadMore();
    expect(stream.photos().length).toBe(40);
  });

  it('stops loading after a partial final batch', () => {
    let call = 0;
    const stream = make({ loadPhotos: () => (call++ === 0 ? of(batch(20)) : of(batch(5, 20))) });
    stream.loadMore();
    stream.loadMore();
    stream.loadMore();
    expect(stream.photos().length).toBe(25);
  });

  it('reports error then recovers on retry', () => {
    let call = 0;
    const stream = make({
      loadPhotos: () => (call++ === 0 ? throwError(() => new Error('x')) : of(batch(20))),
    });
    stream.loadMore();
    expect(stream.status()).toBe('error');
    stream.loadMore();
    expect(stream.status()).toBe('ready');
    expect(stream.photos().length).toBe(20);
  });

  it('handles an empty first batch', () => {
    const stream = make({ loadPhotos: () => of(batch(0)) });
    stream.loadMore();
    expect(stream.photos().length).toBe(0);
    expect(stream.status()).toBe('ready');
  });
});
