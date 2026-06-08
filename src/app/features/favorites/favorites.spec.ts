import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IMAGE_LOADER } from '@angular/common';

import { Favorites } from './favorites';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { BROWSER_STORAGE } from '../../core/tokens/browser-storage';
import { Photo } from '../../core/models/photo';
import { imageLoader } from '../../shared/utils/image-loader';

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

describe('Favorites', () => {
  function setup() {
    TestBed.configureTestingModule({
      imports: [Favorites],
      providers: [
        provideRouter([]),
        { provide: IMAGE_LOADER, useValue: imageLoader },
        { provide: BROWSER_STORAGE, useValue: null },
      ],
    });
    const fixture = TestBed.createComponent(Favorites);
    const favorites = TestBed.inject(FavoritesService);
    return { fixture, favorites };
  }

  it('shows an empty state when there are no favorites', async () => {
    const { fixture } = setup();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain("haven't favorited");
    expect(fixture.nativeElement.querySelectorAll('.tile')).toHaveLength(0);
  });

  it('renders a tile linking to /photos/:id for each favorite (FR-3.3)', async () => {
    const { fixture, favorites } = setup();
    favorites.add(photo('1'));
    favorites.add(photo('2'));
    await fixture.whenStable();

    const links = fixture.nativeElement.querySelectorAll('a.tile') as NodeListOf<HTMLAnchorElement>;
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute('href')).toContain('/photos/1');
  });
});
