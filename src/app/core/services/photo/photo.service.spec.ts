import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { PhotoService } from './photo.service';

const apiItem = {
  id: '10',
  author: 'Ada',
  width: 4000,
  height: 3000,
  url: 'https://unsplash.com/x',
  download_url: 'https://picsum.photos/id/10/4000/3000',
};

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpMock.verify());

  it('loadPhotos requests the page and returns photos', async () => {
    const result = firstValueFrom(service.loadPhotos(2, 3));
    const req = httpMock.expectOne((r) => r.url === 'https://picsum.photos/v2/list');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('limit')).toBe('3');
    req.flush([apiItem]);
    expect(await result).toEqual([apiItem]);
  });

  it('getPhoto requests the info endpoint', async () => {
    const result = firstValueFrom(service.getPhoto('10'));
    httpMock.expectOne('https://picsum.photos/id/10/info').flush(apiItem);
    expect(await result).toEqual(apiItem);
  });
});
