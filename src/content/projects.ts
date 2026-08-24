import { assetPath } from './assetPath';

export type ProjectId = 'horde' | 'koshchei' | 'spirits' | 'animals' | 'wolf';

export type ProjectGalleryItem = { src: string; altKey: string };

export type Project = {
  id: ProjectId;
  title: string;
  href: string;
  image: string;
  translationKey: `projects.${ProjectId}`;
  focalPoint: string;
  gallery: ProjectGalleryItem[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'wolf', title: 'Wolf promo', href: 'https://www.artstation.com/artwork/ndE4bK',
    image: assetPath('/artworks/wolf/logo.jpg'), translationKey: 'projects.wolf', focalPoint: '50% 50%', featured: true,
    gallery: [
      { src: assetPath('/artworks/wolf-promo.jpg'), altKey: 'projects.wolf.gallery.0' },
      { src: assetPath('/artworks/wolf/without-logo.jpg'), altKey: 'projects.wolf.gallery.1' },
    ],
  },
  {
    id: 'horde', title: "Koshchei's Horde", href: 'https://www.artstation.com/artwork/NrGzb1',
    image: assetPath('/artworks/horde/logo.jpg'), translationKey: 'projects.horde', focalPoint: '50% 50%',
    gallery: [
      { src: assetPath('/artworks/koshchei-horde.jpg'), altKey: 'projects.horde.gallery.0' },
      { src: assetPath('/artworks/horde/character-04.jpg'), altKey: 'projects.horde.gallery.1' },
      { src: assetPath('/artworks/horde/character-01.jpg'), altKey: 'projects.horde.gallery.2' },
      { src: assetPath('/artworks/horde/character-02.jpg'), altKey: 'projects.horde.gallery.3' },
      { src: assetPath('/artworks/horde/character-03.jpg'), altKey: 'projects.horde.gallery.4' },
    ],
  },
  {
    id: 'koshchei', title: 'Koshchei', href: 'https://www.artstation.com/artwork/P4enz3',
    image: assetPath('/artworks/koshchei/logo.jpg'), translationKey: 'projects.koshchei', focalPoint: '50% 50%',
    gallery: [
      { src: assetPath('/artworks/koshchei.jpg'), altKey: 'projects.koshchei.gallery.0' },
      { src: assetPath('/artworks/koshchei/process.jpg'), altKey: 'projects.koshchei.gallery.1' },
    ],
  },
  {
    id: 'spirits', title: 'Slavic creatures and spirits', href: 'https://www.artstation.com/artwork/b05OWG',
    image: assetPath('/artworks/spirits/logo.jpg'), translationKey: 'projects.spirits', focalPoint: '50% 50%',
    gallery: [
      { src: assetPath('/artworks/slavic-creatures.jpg'), altKey: 'projects.spirits.gallery.0' },
      { src: assetPath('/artworks/spirits/monster.jpg'), altKey: 'projects.spirits.gallery.1' },
      { src: assetPath('/artworks/spirits/sirin.jpg'), altKey: 'projects.spirits.gallery.2' },
      { src: assetPath('/artworks/spirits/volkolak.jpg'), altKey: 'projects.spirits.gallery.3' },
      { src: assetPath('/artworks/spirits/blud.jpg'), altKey: 'projects.spirits.gallery.4' },
    ],
  },
  {
    id: 'animals', title: 'Animals', href: 'https://www.artstation.com/artwork/0a3BQw',
    image: assetPath('/artworks/animals/logo.jpg'), translationKey: 'projects.animals', focalPoint: '50% 50%',
    gallery: [
      { src: assetPath('/artworks/animals.jpg'), altKey: 'projects.animals.gallery.0' },
      { src: assetPath('/artworks/animals/deer.jpg'), altKey: 'projects.animals.gallery.1' },
      { src: assetPath('/artworks/animals/wolf.jpg'), altKey: 'projects.animals.gallery.2' },
      { src: assetPath('/artworks/animals/boar.jpg'), altKey: 'projects.animals.gallery.3' },
      { src: assetPath('/artworks/animals/hare.jpg'), altKey: 'projects.animals.gallery.4' },
      { src: assetPath('/artworks/animals/silhouette-deer.jpg'), altKey: 'projects.animals.gallery.5' },
      { src: assetPath('/artworks/animals/silhouette-lineup.jpg'), altKey: 'projects.animals.gallery.6' },
      { src: assetPath('/artworks/animals/silhouette-hare.jpg'), altKey: 'projects.animals.gallery.7' },
    ],
  },
];
