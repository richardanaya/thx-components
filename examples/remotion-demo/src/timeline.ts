export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
/** 42 seconds. */
export const DURATION = 1260;

export const DESIGNATION = 'SEN-5241';

export const TYPE_START = 720;
export const TYPE_STEP = 10;

export const BAYS_AT = 420;
export const RECORD_AT = 640;
export const CONFIRM_AT = 860;
export const FILE_AT = 980;
export const CLOSE_AT = 1120;
export const END_AT = 1160;

export type TabId = 'signal' | 'bays' | 'record';

export function typedText(frame: number): string {
  const count = Math.max(
    0,
    Math.min(DESIGNATION.length, Math.floor((frame - TYPE_START) / TYPE_STEP))
  );
  return DESIGNATION.slice(0, count);
}

export function tabFor(frame: number): TabId {
  if (frame < BAYS_AT) return 'signal';
  if (frame < RECORD_AT) return 'bays';
  return 'record';
}

export function alertVariant(frame: number): 'info' | 'success' | 'warning' {
  if (frame < CONFIRM_AT) return 'info';
  if (frame < FILE_AT) return 'success';
  return 'warning';
}

export function alertCopy(frame: number): string {
  if (frame < CONFIRM_AT) return 'Info — awaiting designation';
  if (frame < FILE_AT) return 'Filed — designation accepted';
  return 'Warning — confirm the record';
}

export function logLine(frame: number): string {
  if (frame < BAYS_AT) return 'LDS-1138  SIGNAL LOCK';
  if (frame < RECORD_AT) return 'LDS-1138  BAY SWEEP';
  if (frame < TYPE_START) return 'LDS-1138  OPEN RECORD';
  if (frame < CONFIRM_AT) return 'LDS-1138  ENTER DESIGNATION';
  if (frame < FILE_AT) return 'LDS-1138  DESIGNATION ACCEPTED';
  if (frame < CLOSE_AT + 8) return 'LDS-1138  REVIEW DIALOG';
  return 'LDS-1138  STATUS NOMINAL';
}

export function series(frame: number, phase: number, count: number): number[] {
  return Array.from({ length: count }, (_, index) =>
    Math.round(28 + 32 * Math.sin((frame + phase + index * 16) / 16) + index * 3)
  );
}

export function gaugeValue(frame: number): number {
  return Math.round(58 + 28 * Math.sin(frame / 22));
}

export function progressValue(frame: number): number {
  const cycle = (frame % 240) / 240;
  return Math.round(18 + cycle * 76);
}

export function byteValue(frame: number): number {
  return 48_000 + frame * 920;
}

export function ledStatus(frame: number, index: number): 'ok' | 'warn' | 'error' | 'off' {
  const step = Math.floor(frame / 18 + index) % 5;
  if (step === 0) return 'off';
  if (step === 1) return 'ok';
  if (step === 2) return 'warn';
  return index === 3 && step === 4 ? 'error' : 'ok';
}

export function clicking(frame: number, at: number): boolean {
  return frame >= at && frame < at + 7;
}

export type Mark = { frame: number; x: number; y: number; click?: boolean };

/**
 * Cursor path in composition pixels. Tuned against stills of the laid-out console.
 * Points repeat so the cursor holds still on a control before the click frame.
 */
export const CURSOR: Mark[] = [
  { frame: 90, x: 280, y: 480 },
  { frame: 220, x: 640, y: 420 },
  { frame: 340, x: 1180, y: 390 },
  { frame: 400, x: 260, y: 158 },
  { frame: BAYS_AT, x: 260, y: 158, click: true },
  { frame: 520, x: 220, y: 280 },
  { frame: 610, x: 430, y: 158 },
  { frame: RECORD_AT, x: 430, y: 158, click: true },
  { frame: 700, x: 490, y: 250 },
  { frame: 830, x: 620, y: 250 },
  { frame: 848, x: 130, y: 400 },
  { frame: CONFIRM_AT, x: 130, y: 400, click: true },
  { frame: 940, x: 250, y: 400 },
  { frame: 968, x: 250, y: 400 },
  { frame: FILE_AT, x: 250, y: 400, click: true },
  { frame: 1060, x: 960, y: 560 },
  { frame: 1100, x: 960, y: 610 },
  { frame: CLOSE_AT, x: 960, y: 610, click: true },
  { frame: 1180, x: 1180, y: 720 },
];
