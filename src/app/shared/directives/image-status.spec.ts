import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ImageStatus } from './image-status';

@Component({
  imports: [ImageStatus],
  template: `<img appImageStatus src="x" alt="" />`,
})
class Host {}

describe('ImageStatus', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [Host] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    return { fixture, img };
  }

  it('marks the image as loading until it resolves', () => {
    const { img } = setup();
    expect(img.classList.contains('is-loading')).toBe(true);
  });

  it('clears the loading state once the image loads', () => {
    const { fixture, img } = setup();
    img.dispatchEvent(new Event('load'));
    fixture.detectChanges();

    expect(img.classList.contains('is-loading')).toBe(false);
    expect(img.classList.contains('is-error')).toBe(false);
  });

  it('flags the error state when the image fails to load', () => {
    const { fixture, img } = setup();
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(img.classList.contains('is-error')).toBe(true);
    expect(img.classList.contains('is-loading')).toBe(false);
  });
});
