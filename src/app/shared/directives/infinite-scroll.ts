import { afterNextRender, DestroyRef, Directive, ElementRef, inject, output } from '@angular/core';
import { INTERSECTION_OBSERVER } from '../../core/tokens/intersection-observer';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScroll {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly observerCtor = inject(INTERSECTION_OBSERVER);
  readonly scrolled = output<void>();

  constructor() {
    afterNextRender(() => {
      const observer = new this.observerCtor(
        ([entry]) => {
          if (entry.isIntersecting) this.scrolled.emit();
        },
        { rootMargin: '300px' },
      );
      observer.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
