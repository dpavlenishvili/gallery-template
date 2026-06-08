import { TestBed } from '@angular/core/testing';
import { IMAGE_LOADER } from '@angular/common';
import { PhotoGrid } from './photo-grid';
import { Photo } from '../../../core/models/photo';
import { imageLoader } from '../../utils/image-loader';

const photos: Photo[] = [
  {
    id: '1',
    author: 'A',
    width: 10,
    height: 10,
    url: 'u',
    download_url: 'https://picsum.photos/id/1/10/10',
  },
  {
    id: '2',
    author: 'B',
    width: 10,
    height: 10,
    url: 'u',
    download_url: 'https://picsum.photos/id/2/10/10',
  },
];

describe('PhotoGrid', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [PhotoGrid],
      providers: [{ provide: IMAGE_LOADER, useValue: imageLoader }],
    }),
  );

  it('renders one card per photo', async () => {
    const fixture = TestBed.createComponent(PhotoGrid);
    fixture.componentRef.setInput('photos', photos);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(2);
  });
});
