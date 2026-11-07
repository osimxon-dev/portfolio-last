'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

/**
 * Fixed grid that drifts with scroll, a brighter copy of the grid that lights
 * up around the cursor, and a thin progress line at the top.
 */
export default function Background() {
  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const pos = `50% ${-self.scroll() * 0.25}px`;
        barRef.current.style.transform = `scaleX(${self.progress})`;
        gridRef.current.style.backgroundPosition = pos;
        glowRef.current.style.backgroundPosition = pos;
      },
    });

    const glow = glowRef.current;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.setProperty('--mx', `${e.clientX}px`);
        glow.style.setProperty('--my', `${e.clientY}px`);
        glow.style.opacity = '1';
      });
    };
    const onLeave = () => (glow.style.opacity = '0');
    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      st.kill();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={gridRef} className="grid-bg" aria-hidden="true" />
      <div ref={glowRef} className="grid-glow" aria-hidden="true" />
      <div ref={barRef} className="progress" aria-hidden="true" />
    </>
  );
}
