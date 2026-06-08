import { TestBed } from '@angular/core/testing';
import { PhotoDetail } from './photo-detail';

describe('PhotoDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [PhotoDetail] });
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(PhotoDetail);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
