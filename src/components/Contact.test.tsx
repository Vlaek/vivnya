import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../app/i18n';
import { Contact } from './Contact';

describe('Contact', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('ru');
  });

  it('links to the canonical Vivnya profile without inventing email', () => {
    render(<Contact />);

    const links = screen.getAllByRole('link', { name: /artstation/i });
    expect(links).toHaveLength(1);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://www.artstation.com/vivnya');
    });
    expect(screen.queryByRole('link', { name: /email/i })).not.toBeInTheDocument();
  });

  it('keeps the requested three-line Russian contact headline', () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Давайте\nсоздадим что-то\nзапоминающееся!',
      { normalizeWhitespace: false },
    );
  });
});
