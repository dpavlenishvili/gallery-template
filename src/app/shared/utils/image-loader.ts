import { ImageLoaderConfig } from '@angular/common';

export function imageLoader(config: ImageLoaderConfig): string {
  const parts = config.src.split('/');
  const originalHeight = Number(parts.pop());
  const originalWidth = Number(parts.pop());
  const baseUrl = parts.join('/');

  const width = config.width ?? originalWidth;
  const height = Math.round((originalHeight / originalWidth) * width);

  return `${baseUrl}/${width}/${height}`;
}
