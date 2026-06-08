import { Directive, signal } from '@angular/core';

@Directive({
  selector: 'img[appImageStatus]',
  host: {
    '(load)': 'onLoad()',
    '(error)': 'onError()',
    '[class.is-loading]': 'status() === "loading"',
    '[class.is-error]': 'status() === "error"',
  },
})
export class ImageStatus {
  readonly status = signal<'loading' | 'loaded' | 'error'>('loading');

  protected onLoad(): void {
    this.status.set('loaded');
  }

  protected onError(): void {
    this.status.set('error');
  }
}
