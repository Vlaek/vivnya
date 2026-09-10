import { describe, expect, it } from 'vitest';
import { comic } from './comics';

describe('comic', () => {
  it('keeps every final and process image in the published order', () => {
    expect(comic.title).toBe('The Stone of Eternity / Game comic — Part 1');
    expect(comic.href).toBe('https://www.artstation.com/artwork/b0l8WG');
    expect(comic.gallery.map((item) => item.src)).toEqual([
      '/artworks/comics/stone-of-eternity/page-01.jpg',
      '/artworks/comics/stone-of-eternity/page-02.jpg',
      '/artworks/comics/stone-of-eternity/page-03.jpg',
      '/artworks/comics/stone-of-eternity/page-04.jpg',
      '/artworks/comics/stone-of-eternity/process-line-art.jpg',
      '/artworks/comics/stone-of-eternity/process-storyboard.jpg',
    ]);
  });
});
