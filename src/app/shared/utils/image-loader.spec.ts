import { imageLoader } from './image-loader';

const SRC = 'https://picsum.photos/id/42/2500/1667';

describe('imageLoader', () => {
  it('requests the asked-for width and scales height to keep the ratio', () => {
    expect(imageLoader({ src: SRC, width: 1000 })).toBe('https://picsum.photos/id/42/1000/667');
  });

  it('falls back to the original size when no width is requested', () => {
    expect(imageLoader({ src: SRC })).toBe('https://picsum.photos/id/42/2500/1667');
  });

  it('rounds the scaled height', () => {
    expect(imageLoader({ src: SRC, width: 800 })).toBe('https://picsum.photos/id/42/800/533');
  });
});
