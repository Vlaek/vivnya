import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../app/i18n';
import { Hero } from './Hero';

describe('Hero', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('ru');
  });

  it('renders a static centered scroll icon', () => {
    render(<Hero />);

    const scrollLink = screen.getByRole('link', { name: 'Работы' });
    expect(scrollLink).toHaveClass('hero__scroll');
    expect(scrollLink.querySelector('svg')).toHaveClass('hero__scroll-icon');
  });
});
