import { describe, expect, it } from 'vitest';
import { comics } from './comics';

describe('comics', () => {
  it('keeps the series parts in narrative order', () => {
    expect(comics.map((comic) => comic.title)).toEqual([
      'The Stone of Eternity / Game comic — Part 1',
      'The Stone of Eternity / Game comic — Part 2',
    ]);
    expect(comics.map((comic) => comic.href)).toEqual([
      'https://www.artstation.com/artwork/b0l8WG',
      'https://www.artstation.com/artwork/o0JdWq',
    ]);
  });

  it('keeps every image in its published order', () => {
    expect(comics[0].gallery.map((item) => item.src)).toEqual([
      '/artworks/comics/stone-of-eternity/page-01.jpg',
      '/artworks/comics/stone-of-eternity/page-02.jpg',
      '/artworks/comics/stone-of-eternity/page-03.jpg',
      '/artworks/comics/stone-of-eternity/page-04.jpg',
      '/artworks/comics/stone-of-eternity/process-line-art.jpg',
      '/artworks/comics/stone-of-eternity/process-storyboard.jpg',
    ]);
    expect(comics[1].gallery.map((item) => item.src)).toEqual([
      '/artworks/comics/stone-of-eternity-part-2/page-01.jpg',
      '/artworks/comics/stone-of-eternity-part-2/page-02.jpg',
    ]);
  });
});
