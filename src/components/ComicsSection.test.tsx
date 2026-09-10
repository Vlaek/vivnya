import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../app/i18n';
import { ComicsSection } from './ComicsSection';

describe('ComicsSection', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders an editorial comic feature with a direct ArtStation link', () => {
    const { container } = render(<ComicsSection />);

    expect(screen.getByRole('heading', { name: 'Comics' })).toBeVisible();
    const projectTitle = screen.getByRole('heading', {
      name: 'The Stone of Eternity / Game comic — Part 1',
    });
    expect(projectTitle).toBeVisible();
    expect(projectTitle.querySelectorAll(':scope > span')).toHaveLength(3);
    expect(projectTitle.querySelectorAll(':scope > span')[0]).toHaveTextContent(
      'The Stone of Eternity',
    );
    expect(projectTitle.querySelectorAll(':scope > span')[1]).toHaveTextContent('Game comic');
    expect(projectTitle.querySelectorAll(':scope > span')[2]).toHaveTextContent('Part 1');
    expect(screen.getByRole('link', { name: /open on ArtStation/i })).toHaveAttribute(
      'href',
      'https://www.artstation.com/artwork/b0l8WG',
    );
    expect(container.querySelector('article')).toHaveClass(
      'grid-cols-1',
      'lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]',
    );
  });

  it('opens all six comic images, navigates them, and restores focus', async () => {
    const user = userEvent.setup();
    render(<ComicsSection />);

    const opener = screen.getByRole('button', { name: /open gallery/i });
    await user.click(opener);

    expect(screen.getByRole('dialog', { name: /stone of eternity/i })).toBeVisible();
    expect(screen.getByText('1 / 6')).toBeVisible();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('2 / 6')).toBeVisible();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(opener).toHaveFocus());
  });
});
