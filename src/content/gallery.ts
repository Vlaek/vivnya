export type GalleryItem = {
  src: string;
  altKey: string;
};

export type GalleryProject = {
  title: string;
  href: string;
  gallery: GalleryItem[];
};
