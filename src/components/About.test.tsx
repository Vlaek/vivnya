import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../app/i18n';
import { About } from './About';

describe('About', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('ru');
  });

  it('renders the supplied portrait with localized alternative text', () => {
    render(<About />);

    expect(screen.getByRole('img', { name: 'Портрет Миланы Зубаревой' })).toHaveAttribute(
      'src',
      '/artworks/about-avatar.png',
    );
  });

  it('groups the profile facts with the biography in the right column', () => {
    render(<About />);

    const biographyColumn = screen.getByText(/Создаю иллюстрации/).closest('.about__content');
    expect(biographyColumn).toContainElement(screen.getByText('Специализация'));
    expect(screen.getByText('Анимация')).toBeVisible();
  });

  it('renders the animation specialty in English', async () => {
    await i18n.changeLanguage('en');
    render(<About />);

    expect(screen.getByText('Animation')).toBeVisible();
  });
});
