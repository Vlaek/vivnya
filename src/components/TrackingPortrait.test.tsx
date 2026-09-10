import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TrackingPortrait } from './TrackingPortrait';

vi.mock('../content/assetPath', () => ({
  assetPath: (path: string) => `/vivnya/${path.replace(/^\//, '')}`,
}));

function mockMedia({ reducedMotion = false } = {}) {
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? reducedMotion : true,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
}

describe('TrackingPortrait', () => {
  beforeEach(() => {
    mockMedia();
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 100 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 100 });
    vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    }));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  it('renders the portrait with the supplied accessible name', () => {
    render(<TrackingPortrait alt="Character at a computer" />);

    expect(screen.getByRole('img', { name: 'Character at a computer' })).toHaveAttribute(
      'src',
      '/vivnya/artworks/contact-portrait.png',
    );
  });

  it('aims each pupil from its eye center toward the cursor and recenters on window blur', () => {
    const { container } = render(<TrackingPortrait alt="Character at a computer" />);
    const leftEye = container.querySelector<HTMLElement>('.tracking-portrait__eye--left')!;
    const rightEye = container.querySelector<HTMLElement>('.tracking-portrait__eye--right')!;
    vi.spyOn(leftEye, 'getBoundingClientRect').mockReturnValue({
      x: 35, y: 45, left: 35, top: 45, right: 45, bottom: 55, width: 10, height: 10,
      toJSON: () => ({}),
    });
    vi.spyOn(rightEye, 'getBoundingClientRect').mockReturnValue({
      x: 55, y: 45, left: 55, top: 45, right: 65, bottom: 55, width: 10, height: 10,
      toJSON: () => ({}),
    });

    fireEvent.pointerMove(window, { clientX: 50, clientY: 0, pointerType: 'mouse' });

    expect(screen.getByTestId('pupil-left')).toHaveStyle({
      transform: 'translate3d(calc(-50% + 1px), calc(-50% + -5px), 0)',
    });
    expect(screen.getByTestId('pupil-right')).toHaveStyle({
      transform: 'translate3d(calc(-50% + -1px), calc(-50% + -5px), 0)',
    });

    fireEvent.blur(window);

    for (const pupil of [screen.getByTestId('pupil-left'), screen.getByTestId('pupil-right')]) {
      expect(pupil).toHaveStyle({ transform: 'translate3d(-50%, -50%, 0)' });
    }
  });

  it('keeps pupils centered when reduced motion is requested', () => {
    mockMedia({ reducedMotion: true });
    render(<TrackingPortrait alt="Character at a computer" />);

    fireEvent.pointerMove(window, { clientX: 1000, clientY: 1000, pointerType: 'mouse' });

    expect(screen.getByTestId('pupil-left')).toHaveStyle({
      transform: 'translate3d(-50%, -50%, 0)',
    });
  });

  it('keeps pupils centered for a touch pointer on a hybrid device', () => {
    const { container } = render(<TrackingPortrait alt="Character at a computer" />);
    const eyes = container.querySelectorAll<HTMLElement>('.tracking-portrait__eye');
    eyes.forEach((eye, index) => {
      vi.spyOn(eye, 'getBoundingClientRect').mockReturnValue({
        x: index * 20,
        y: 0,
        left: index * 20,
        top: 0,
        right: index * 20 + 10,
        bottom: 10,
        width: 10,
        height: 10,
        toJSON: () => ({}),
      });
    });

    fireEvent.pointerMove(window, { clientX: 100, clientY: 100, pointerType: 'mouse' });
    expect(screen.getByTestId('pupil-left')).not.toHaveStyle({
      transform: 'translate3d(-50%, -50%, 0)',
    });

    fireEvent.pointerMove(window, { clientX: 1000, clientY: 1000, pointerType: 'touch' });

    expect(screen.getByTestId('pupil-left')).toHaveStyle({
      transform: 'translate3d(-50%, -50%, 0)',
    });
  });

  it('keeps the recreated eye whites behind a visible contour', () => {
    const { container } = render(<TrackingPortrait alt="Character at a computer" />);
    const leftEye = container.querySelector<HTMLElement>('.tracking-portrait__eye--left')!;
    const contour = screen.getByTestId('eye-contour-left');

    expect(leftEye.lastElementChild).toBe(contour);
  });

});
