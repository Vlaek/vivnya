import { assetPath } from './assetPath';
import type { GalleryProject } from './gallery';

/** Часть комикса, входящая в общий повествовательный цикл. */
export type Comic = GalleryProject & {
  id: 'stone-of-eternity-part-1' | 'stone-of-eternity-part-2';
  image: string;
  translationKey: 'comics.parts.part1' | 'comics.parts.part2';
};

const partOnePath = '/artworks/comics/stone-of-eternity';
const partTwoPath = '/artworks/comics/stone-of-eternity-part-2';

/** Части цикла «The Stone of Eternity» в порядке чтения. */
export const comics: readonly Comic[] = [
  {
    id: 'stone-of-eternity-part-1',
    title: 'The Stone of Eternity / Game comic — Part 1',
    href: 'https://www.artstation.com/artwork/b0l8WG',
    image: assetPath(`${partOnePath}/page-01.jpg`),
    translationKey: 'comics.parts.part1',
    gallery: [
      { src: assetPath(`${partOnePath}/page-01.jpg`), altKey: 'comics.parts.part1.gallery.0' },
      { src: assetPath(`${partOnePath}/page-02.jpg`), altKey: 'comics.parts.part1.gallery.1' },
      { src: assetPath(`${partOnePath}/page-03.jpg`), altKey: 'comics.parts.part1.gallery.2' },
      { src: assetPath(`${partOnePath}/page-04.jpg`), altKey: 'comics.parts.part1.gallery.3' },
      { src: assetPath(`${partOnePath}/process-line-art.jpg`), altKey: 'comics.parts.part1.gallery.4' },
      { src: assetPath(`${partOnePath}/process-storyboard.jpg`), altKey: 'comics.parts.part1.gallery.5' },
    ],
  },
  {
    id: 'stone-of-eternity-part-2',
    title: 'The Stone of Eternity / Game comic — Part 2',
    href: 'https://www.artstation.com/artwork/o0JdWq',
    image: assetPath(`${partTwoPath}/page-01.jpg`),
    translationKey: 'comics.parts.part2',
    gallery: [
      { src: assetPath(`${partTwoPath}/page-01.jpg`), altKey: 'comics.parts.part2.gallery.0' },
      { src: assetPath(`${partTwoPath}/page-02.jpg`), altKey: 'comics.parts.part2.gallery.1' },
    ],
  },
];
