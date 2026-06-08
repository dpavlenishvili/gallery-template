import { TestBed } from '@angular/core/testing';
import { IMAGE_LOADER } from '@angular/common';
import { PhotoCard } from './photo-card';
import { Photo } from '../../../core/models/photo';
import { imageLoader } from '../../utils/image-loader';

const photo: Photo = {
  id: '7',
  author: 'Grace',
  width: 100,
  height: 100,
  url: 'u',
  download_url: 'https://picsum.photos/id/7/100/100',
};

describe('PhotoCard', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [PhotoCard],
      providers: [{ provide: IMAGE_LOADER, useValue: imageLoader }],
    }),
  );

  it('renders the image with author alt text', async () => {
    const fixture = TestBed.createComponent(PhotoCard);
    fixture.componentRef.setInput('photo', photo);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('alt')).toBe('Grace');
  });

  it('emits select when clicked', async () => {
    const fixture = TestBed.createComponent(PhotoCard);
    fixture.componentRef.setInput('photo', photo);
    await fixture.whenStable();
    let selected: Photo | undefined;
    fixture.componentInstance.select.subscribe((p) => (selected = p));
    fixture.nativeElement.querySelector('button').click();
    expect(selected).toEqual(photo);
  });
});
