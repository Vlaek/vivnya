import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import '../app/i18n';
import { LanguageSwitch } from './LanguageSwitch';

describe('LanguageSwitch', () => {
  beforeEach(() => {
    localStorage.setItem('vivnya-language', 'ru');
  });

  it('switches language, persists it, and updates document language', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitch />);

    await user.click(screen.getByRole('button', { name: 'English' }));

    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(localStorage.getItem('vivnya-language')).toBe('en');
    expect(document.title).toBe('Vivnya — 2D Artist & Concept Art');
  });
});
