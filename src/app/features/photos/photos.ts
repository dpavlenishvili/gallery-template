import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PhotoGrid } from '../../shared/components/photo-grid/photo-grid';
import { LoadingIndicator } from '../../shared/components/loading-indicator/loading-indicator';
import { InfiniteScroll } from '../../shared/directives/infinite-scroll';
import { Photostream } from './photostream';
import { FavoritesService } from '../../core/services/favorites/favorites.service';

@Component({
  selector: 'app-photos',
  imports: [PhotoGrid, LoadingIndicator, InfiniteScroll, MatButtonModule],
  providers: [Photostream],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos implements OnInit {
  protected readonly stream = inject(Photostream);
  protected readonly favorites = inject(FavoritesService);

  ngOnInit(): void {
    this.stream.loadMore();
  }
}
