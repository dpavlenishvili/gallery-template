import { TestBed } from '@angular/core/testing';
import { Favorites } from './favorites';

describe('Favorites', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Favorites] });
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(Favorites);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
