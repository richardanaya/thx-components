import { Composition } from 'remotion';
import { ConsoleFilm } from './ConsoleFilm';
import { DURATION, FPS, HEIGHT, WIDTH } from './timeline';

export const RemotionRoot = () => {
  return (
    <Composition
      id="THX1138"
      component={ConsoleFilm}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
