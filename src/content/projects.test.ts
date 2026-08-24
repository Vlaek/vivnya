import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects', () => {
  it('contains five unique canonical ArtStation projects', () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map((project) => project.href)).size).toBe(5);
    expect(
      projects.every((project) => project.href.startsWith('https://www.artstation.com/artwork/')),
    ).toBe(true);
  });

  it('uses canonical ArtStation titles and local gallery images without card numbers', () => {
    expect(projects.map((project) => project.title)).toEqual([
      'Wolf promo',
      "Koshchei's Horde",
      'Koshchei',
      'Slavic creatures and spirits',
      'Animals',
    ]);

    projects.forEach((project) => {
      expect(project).not.toHaveProperty('number');
      expect(project.gallery.length).toBeGreaterThan(1);
      expect(project.image).toMatch(/\/logo\.jpg$/);
      expect(project.gallery.every((image) => image.src.startsWith('/artworks/'))).toBe(true);
    });
  });
});
