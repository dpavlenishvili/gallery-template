import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Photos',
    loadComponent: () => import('./features/photos/photos').then((m) => m.Photos),
  },
  {
    path: 'favorites',
    title: 'Favorites',
    loadComponent: () => import('./features/favorites/favorites').then((m) => m.Favorites),
  },
  {
    path: 'photos/:id',
    title: 'Photo',
    loadComponent: () => import('./features/photo-detail/photo-detail').then((m) => m.PhotoDetail),
  },
  { path: '**', redirectTo: '' },
];
