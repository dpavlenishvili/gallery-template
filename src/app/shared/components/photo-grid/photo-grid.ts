import { Component, input, output } from '@angular/core';
import { Photo } from '../../../core/models/photo';
import { PhotoCard } from '../photo-card/photo-card';

@Component({
  selector: 'app-photo-grid',
  imports: [PhotoCard],
  templateUrl: './photo-grid.html',
  styleUrl: './photo-grid.scss',
})
export class PhotoGrid {
  readonly photos = input.required<Photo[]>();
  readonly favoriteIds = input<ReadonlySet<string>>(new Set<string>());
  readonly select = output<Photo>();
}
