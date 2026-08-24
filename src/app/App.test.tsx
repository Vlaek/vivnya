import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from './i18n';
import { App } from './App';

describe('App shell', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders identity, navigation, skip link, and one main landmark', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /vivnya/i })).toBeVisible();
    expect(screen.getByRole('navigation')).toBeVisible();
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
