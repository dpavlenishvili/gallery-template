import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { PhotoService } from '../../core/services/photo/photo.service';
import { FavoritesService } from '../../core/services/favorites/favorites.service';
import { LoadingIndicator } from '../../shared/components/loading-indicator/loading-indicator';
import { MatIcon } from '@angular/material/icon';
import { ImageStatus } from '../../shared/directives/image-status';

@Component({
  selector: 'app-photo-detail',
  imports: [RouterLink, MatButton, NgOptimizedImage, LoadingIndicator, MatIcon, ImageStatus],
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.scss',
})
export class PhotoDetail {
  private readonly photoService = inject(PhotoService);
  protected readonly favorites = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly photoResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.photoService.getPhoto(params),
  });

  protected readonly isFavorite = computed(() => this.favorites.isFavorite(this.id()));

  protected removeFromFavorites(): void {
    this.favorites.remove(this.id());
    void this.router.navigate(['/favorites']);
  }
}
