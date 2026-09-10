import { assetPath } from './assetPath';
import type { GalleryProject } from './gallery';

export type Comic = GalleryProject & {
  id: 'stone-of-eternity';
  image: string;
  translationKey: 'comics.project';
};

const artworkPath = '/artworks/comics/stone-of-eternity';

export const comic: Comic = {
  id: 'stone-of-eternity',
  title: 'The Stone of Eternity / Game comic — Part 1',
  href: 'https://www.artstation.com/artwork/b0l8WG',
  image: assetPath(`${artworkPath}/page-01.jpg`),
  translationKey: 'comics.project',
  gallery: [
    { src: assetPath(`${artworkPath}/page-01.jpg`), altKey: 'comics.project.gallery.0' },
    { src: assetPath(`${artworkPath}/page-02.jpg`), altKey: 'comics.project.gallery.1' },
    { src: assetPath(`${artworkPath}/page-03.jpg`), altKey: 'comics.project.gallery.2' },
    { src: assetPath(`${artworkPath}/page-04.jpg`), altKey: 'comics.project.gallery.3' },
    {
      src: assetPath(`${artworkPath}/process-line-art.jpg`),
      altKey: 'comics.project.gallery.4',
    },
    {
      src: assetPath(`${artworkPath}/process-storyboard.jpg`),
      altKey: 'comics.project.gallery.5',
    },
  ],
};
