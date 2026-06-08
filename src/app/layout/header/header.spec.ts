import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Header } from './header';

@Component({ template: '' })
class TestStub {}

describe('Header', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([
          { path: '', component: TestStub },
          { path: 'favorites', component: TestStub },
          { path: 'photos/:id', component: TestStub },
        ]),
      ],
    });
    router = TestBed.inject(Router);
  });

  it('renders the Photos and Favorites links', async () => {
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();

    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];
    const labels = links.map((a) => a.textContent?.trim());

    expect(labels).toContain('Photos');
    expect(labels).toContain('Favorites');
  });

  it('highlights the link matching the current route', async () => {
    const fixture = TestBed.createComponent(Header);

    await router.navigateByUrl('/');
    await fixture.whenStable();
    let active = fixture.nativeElement.querySelector('.active-link');
    expect(active?.textContent?.trim()).toBe('Photos');

    await router.navigateByUrl('/favorites');
    await fixture.whenStable();
    active = fixture.nativeElement.querySelector('.active-link');
    expect(active?.textContent?.trim()).toBe('Favorites');
  });
});
