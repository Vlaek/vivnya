import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../app/i18n';
import { ComicsSection } from './ComicsSection';

describe('ComicsSection', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders the series with the first part selected by default', () => {
    const { container } = render(<ComicsSection />);

    expect(screen.getByRole('heading', { name: 'Comics' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'The Stone of Eternity' })).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Part 1' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Part 2' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: 'Part 1' })).toHaveClass('comic-part-tab');
    expect(screen.getByRole('tab', { name: 'Part 2' })).toHaveClass('comic-part-tab');
    const projectTitle = screen.getByRole('heading', {
      name: 'The Stone of Eternity / Game comic — Part 1',
    });
    expect(projectTitle).toBeVisible();
    expect(projectTitle).toHaveTextContent('Part 1');
    expect(screen.getByText('Game comic', { selector: 'p' })).toBeVisible();
    expect(screen.queryByText('Game comic · Part 1')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open on ArtStation/i })).toHaveAttribute(
      'href',
      'https://www.artstation.com/artwork/b0l8WG',
    );
    expect(screen.getByRole('link', { name: /open on ArtStation/i })).toHaveClass(
      'comic-action-link',
      'lg:mt-auto',
    );
    expect(screen.getByRole('button', { name: 'Previous part' })).toHaveClass(
      'comic-part-navigation',
    );
    expect(screen.getByRole('button', { name: 'Next part' })).toHaveClass(
      'comic-part-navigation',
    );
    expect(container.querySelector('article')).toHaveClass(
      'grid-cols-1',
      'lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]',
      'lg:items-stretch',
    );
    expect(projectTitle.parentElement).toHaveClass('lg:h-full', 'lg:flex-col');
  });

  it('switches the active part and opens its own gallery', async () => {
    const user = userEvent.setup();
    render(<ComicsSection />);

    await user.click(screen.getByRole('tab', { name: 'Part 2' }));

    expect(screen.getByRole('tab', { name: 'Part 2' })).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('heading', { name: 'The Stone of Eternity / Game comic — Part 2' }),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: /open on ArtStation/i })).toHaveAttribute(
      'href',
      'https://www.artstation.com/artwork/o0JdWq',
    );

    await user.click(screen.getByRole('button', { name: /open gallery/i }));
    expect(screen.getByText('1 / 2')).toBeVisible();
  });

  it('navigates between adjacent parts', async () => {
    const user = userEvent.setup();
    render(<ComicsSection />);

    expect(screen.getByRole('button', { name: 'Previous part' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next part' }));

    expect(screen.getByRole('tab', { name: 'Part 2' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('button', { name: 'Next part' })).toBeDisabled();
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
