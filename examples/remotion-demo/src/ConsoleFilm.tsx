import { AbsoluteFill, continueRender, delayRender, useCurrentFrame } from 'remotion';
import { useEffect, useLayoutEffect, useRef, useState, type FC } from 'react';

/**
 * Importing `thx-components` defines custom elements. Remotion evaluates this
 * file in Node to discover the composition, where `customElements` does not
 * exist, so the library loads only in the browser render.
 */
export const ConsoleFilm: FC = () => {
  const frame = useCurrentFrame();
  const [Surface, setSurface] = useState<FC | null>(null);
  const [handle] = useState(() => delayRender('Load thx-components'));
  const released = useRef(false);
  const paint = delayRender(`Paint frame ${frame}`);

  useEffect(() => {
    let live = true;
    void import('./Surface')
      .then(mod => {
        if (!live) return;
        setSurface(() => mod.Surface);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
    return () => {
      live = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!Surface || released.current) return;
    released.current = true;
    continueRender(handle);
  }, [Surface, handle]);

  useEffect(() => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      continueRender(paint);
    };
    if (!Surface) {
      finish();
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(finish));
    return () => {
      cancelAnimationFrame(id);
      finish();
    };
  }, [Surface, paint]);

  if (!Surface) {
    return <AbsoluteFill style={{ background: '#e0e0e0' }} />;
  }
  return <Surface />;
};
