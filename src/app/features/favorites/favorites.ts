import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { ImageStatus } from '../../shared/directives/image-status';

@Component({
  selector: 'app-favorites',
  imports: [NgOptimizedImage, RouterLink, MatButton, ImageStatus],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  protected readonly favorites = inject(FavoritesService);
}
