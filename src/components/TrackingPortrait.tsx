import { useEffect, useRef } from 'react';
import { assetPath } from '../content/assetPath';

type TrackingPortraitProps = {
  alt: string;
};

const centeredTransform = 'translate3d(-50%, -50%, 0)';
const pupilTravel = 5;
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

export function TrackingPortrait({ alt }: TrackingPortraitProps) {
  const eyeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const pupilRefs = useRef<Array<HTMLElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);

  const setPupilOffsets = (offsets: Array<{ x: number; y: number }>) => {
    pupilRefs.current.forEach((pupil, index) => {
      if (!pupil) return;
      const { x, y } = offsets[index] ?? { x: 0, y: 0 };
      pupil.style.transform = x === 0 && y === 0
        ? centeredTransform
        : `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
    });
  };

  const centerPupils = () => setPupilOffsets([{ x: 0, y: 0 }, { x: 0, y: 0 }]);

  useEffect(() => {
    const resetPupils = () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      centerPupils();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        resetPupils();
        return;
      }

      const supportsTracking = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!supportsTracking || reducedMotion) {
        resetPupils();
        return;
      }

      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(() => {
        const offsets = eyeRefs.current.map((eye) => {
          if (!eye) return { x: 0, y: 0 };
          const rect = eye.getBoundingClientRect();
          const x = event.clientX - (rect.left + rect.width / 2);
          const y = event.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(x, y);
          if (distance === 0) return { x: 0, y: 0 };
          return {
            x: Math.round(clamp(x / distance) * pupilTravel),
            y: Math.round(clamp(y / distance) * pupilTravel),
          };
        });
        setPupilOffsets(offsets);
        animationFrameRef.current = null;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('blur', resetPupils);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetPupils);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <figure
      className="tracking-portrait"
      data-testid="tracking-portrait"
    >
      <img src={assetPath('/artworks/contact-portrait.png')} alt={alt} />
      <span
        className="tracking-portrait__eye tracking-portrait__eye--left"
        aria-hidden="true"
        ref={(node) => { eyeRefs.current[0] = node; }}
      >
        <i
          data-testid="pupil-left"
          ref={(node) => { pupilRefs.current[0] = node; }}
          style={{ transform: centeredTransform }}
        />
        <span className="tracking-portrait__eye-contour" data-testid="eye-contour-left" />
      </span>
      <span
        className="tracking-portrait__eye tracking-portrait__eye--right"
        aria-hidden="true"
        ref={(node) => { eyeRefs.current[1] = node; }}
      >
        <i
          data-testid="pupil-right"
          ref={(node) => { pupilRefs.current[1] = node; }}
          style={{ transform: centeredTransform }}
        />
        <span className="tracking-portrait__eye-contour" data-testid="eye-contour-right" />
      </span>
    </figure>
  );
}
