import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { IMAGE_LOADER } from '@angular/common';
import { of, throwError } from 'rxjs';
import { PhotoDetail } from './photo-detail';
import { PhotoService } from '../../core/services/photo/photo.service';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { BROWSER_STORAGE } from '../../core/tokens/browser-storage';
import { Photo } from '../../core/models/photo';
import { imageLoader } from '../../shared/utils/image-loader';

const photo: Photo = {
  id: '42',
  author: 'Grace',
  width: 1200,
  height: 800,
  url: 'u',
  download_url: 'https://picsum.photos/id/42/1200/800',
};

describe('PhotoDetail', () => {
  function setup(service: Partial<PhotoService>) {
    TestBed.configureTestingModule({
      imports: [PhotoDetail],
      providers: [
        provideRouter([]),
        { provide: IMAGE_LOADER, useValue: imageLoader },
        { provide: BROWSER_STORAGE, useValue: null },
        { provide: PhotoService, useValue: service },
      ],
    });
    const fixture = TestBed.createComponent(PhotoDetail);
    fixture.componentRef.setInput('id', '42');
    return fixture;
  }

  it('renders the photo for the route id', async () => {
    const fixture = setup({ getPhoto: () => of(photo) });
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('alt')).toBe('Grace');
  });

  it('shows an error state on failure', async () => {
    const fixture = setup({ getPhoto: () => throwError(() => new Error('404')) });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain("Couldn't load this photo.");
  });

  it('removes the photo from favorites and navigates back (FR-4.2/4.3)', async () => {
    const fixture = setup({ getPhoto: () => of(photo) });
    const favorites = TestBed.inject(FavoritesService);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    favorites.add(photo);
    await fixture.whenStable();

    const remove = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    remove.click();
    await fixture.whenStable();

    expect(favorites.isFavorite('42')).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
