import { Component, input } from '@angular/core';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.scss',
})
export class PhotoDetail {
  // Bound from the `photos/:id` route param via `withComponentInputBinding()`.
  readonly id = input<string>();
}
