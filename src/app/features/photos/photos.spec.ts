import { TestBed } from '@angular/core/testing';
import { Photos } from './photos';

describe('Photos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Photos] });
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(Photos);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
