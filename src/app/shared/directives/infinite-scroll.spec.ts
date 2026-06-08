import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { INTERSECTION_OBSERVER } from '../../core/tokens/intersection-observer';
import { InfiniteScroll } from './infinite-scroll';

@Component({
  imports: [InfiniteScroll],
  template: `<div appInfiniteScroll (scrolled)="count = count + 1"></div>`,
})
class Host {
  count = 0;
}

class FakeIntersectionObserver implements IntersectionObserver {
  static last: FakeIntersectionObserver | undefined;
  readonly root = null;
  readonly scrollMargin: string = '';
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  constructor(private readonly cb: IntersectionObserverCallback) {
    FakeIntersectionObserver.last = this;
  }
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  fire(): void {
    this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this);
  }
}

describe('InfiniteScroll', () => {
  beforeEach(() => {
    FakeIntersectionObserver.last = undefined;
    TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: INTERSECTION_OBSERVER, useValue: FakeIntersectionObserver }],
    });
  });

  it('emits scrolled when the sentinel intersects', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();

    FakeIntersectionObserver.last!.fire();

    expect(fixture.componentInstance.count).toBe(1);
  });
});
