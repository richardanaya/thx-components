import { Easing, interpolate } from 'remotion';
import { CLOSE_AT, CURSOR, FILE_AT, type Mark } from './timeline';

function place(frame: number, marks: Mark[]): { x: number; y: number } {
  let index = 0;
  while (index < marks.length - 1 && frame > marks[index + 1].frame) index += 1;
  const from = marks[index];
  const to = marks[Math.min(index + 1, marks.length - 1)];
  if (from === to || from.frame === to.frame) return { x: from.x, y: from.y };
  const easing = Easing.inOut(Easing.cubic);
  return {
    x: interpolate(frame, [from.frame, to.frame], [from.x, to.x], {
      easing,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
    y: interpolate(frame, [from.frame, to.frame], [from.y, to.y], {
      easing,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  };
}

export function cursorPoint(frame: number): { x: number; y: number; clicking: boolean } {
  const { x, y } = place(frame, CURSOR);
  const clicking = CURSOR.some(mark => mark.click && frame >= mark.frame && frame < mark.frame + 7);
  return { x, y, clicking };
}

/** Drawn inside the dialog. The dialog paints in the top layer, above a page cursor. */
export function DialogCursor({ frame, clicking }: { frame: number; clicking: boolean }) {
  const travel = interpolate(frame, [FILE_AT + 12, CLOSE_AT - 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <Cursor x="46%" y={`${22 + travel * 52}%`} clicking={clicking} />;
}

export function Cursor({
  x,
  y,
  clicking,
}: {
  x: number | string;
  y: number | string;
  clicking: boolean;
}) {
  return (
    <div
      className={clicking ? 'cursor clicking' : 'cursor'}
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      <svg width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M4 3 L4 23 L10 17.5 L14.5 25 L18 23.2 L13.4 15.6 L22 15 Z"
          fill="#111"
          stroke="#fafafa"
          strokeWidth="1.4"
        />
      </svg>
      {clicking ? <span className="cursor-ring" /> : null}
    </div>
  );
}
