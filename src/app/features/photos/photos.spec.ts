import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER } from '@angular/common';
import { of, throwError } from 'rxjs';
import { Photos } from './photos';
import { PhotoService } from '../../core/services/photo/photo.service';
import { INTERSECTION_OBSERVER } from '../../core/tokens/intersection-observer';
import { Photo } from '../../core/models/photo';
import { imageLoader } from '../../shared/utils/image-loader';

class NoopIntersectionObserver {
  constructor(_callback: IntersectionObserverCallback) {}
  observe(): void {}
  disconnect(): void {}
}

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

describe('Photos', () => {
  function setup(service: Partial<PhotoService>) {
    TestBed.configureTestingModule({
      imports: [Photos],
      providers: [
        provideRouter([]),
        { provide: IMAGE_LOADER, useValue: imageLoader },
        { provide: INTERSECTION_OBSERVER, useValue: NoopIntersectionObserver },
        { provide: PhotoService, useValue: service },
      ],
    });
    return TestBed.createComponent(Photos);
  }

  it('loads the first page on init', async () => {
    const fixture = setup({ loadPhotos: () => of(batch(20)) });
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(20);
  });

  it('shows an error state on failure', async () => {
    const fixture = setup({ loadPhotos: () => throwError(() => new Error('boom')) });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain("Couldn't load photos.");
  });
});
