import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Photo } from '../../../core/models/photo';
import { MatIcon } from '@angular/material/icon';
import { ImageStatus } from '../../directives/image-status';

@Component({
  selector: 'app-photo-card',
  imports: [NgOptimizedImage, MatIcon, ImageStatus],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss',
})
export class PhotoCard {
  readonly photo = input.required<Photo>();
  readonly priority = input(false);
  readonly favorite = input(false);
  readonly select = output<Photo>();
}
