import { TestBed } from '@angular/core/testing';
import { LoadingIndicator } from './loading-indicator';

describe('LoadingIndicator', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [LoadingIndicator] }));
  it('renders an accessible spinner', async () => {
    const fixture = TestBed.createComponent(LoadingIndicator);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();
  });
});
