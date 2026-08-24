import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import '../app/i18n';
import { WorkGrid } from './WorkGrid';

describe('WorkGrid', () => {
  it('renders canonical titles in a responsive Tailwind grid without numbering', () => {
    const { container } = render(<WorkGrid />);

    expect(screen.getByRole('heading', { name: 'Wolf promo' })).toBeVisible();
    expect(screen.queryByText('01')).not.toBeInTheDocument();
    expect(container.querySelector('#work > .grid')).toHaveClass(
      'grid-cols-1',
      'md:grid-cols-2',
      'xl:grid-cols-3',
    );
    const cards = container.querySelectorAll('.project-card');
    expect(cards).toHaveLength(5);
    cards.forEach((card) => {
      expect(card).toHaveClass('w-full');
      expect(card).not.toHaveClass('max-w-[400px]', 'h-full');
      expect(card.querySelector('img')).toHaveClass('aspect-square');
      expect(card.querySelector('.project-card__meta')).not.toHaveClass('mt-auto');
    });
  });

  it('opens a gallery lightbox, navigates with the keyboard, and restores focus', async () => {
    const user = userEvent.setup();
    render(<WorkGrid />);

    const opener = screen.getByRole('button', { name: /wolf promo/i });
    await user.click(opener);

    const dialog = screen.getByRole('dialog', { name: /wolf promo/i });
    expect(dialog).toBeVisible();
    expect(screen.getByText('1 / 2')).toBeVisible();
    expect(screen.getByRole('button', { name: /close gallery|закрыть галерею/i })).toHaveClass(
      'cursor-pointer',
    );
    expect(screen.getByRole('button', { name: /next image|следующее изображение/i })).toHaveClass(
      'cursor-pointer',
    );

    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('2 / 2')).toBeVisible();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(opener).toHaveFocus());
  });
});
