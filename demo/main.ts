import '../src/theme/aesthetics.css';
import { createAgent } from '@ui-sdk/web/agent';
import { createToaster } from '@ui-sdk/web';
import '../src/register.ts';

const agent = createAgent();
window.__thxAgent = agent;

const log = document.querySelector<HTMLElement>('#action-log');
document.querySelector('#confirm')?.addEventListener('action', () => {
  if (log) log.textContent = 'CONFIRM ACCEPTED';
});

document.querySelector('#read-surface')?.addEventListener('action', () => {
  const report = document.querySelector<HTMLElement>('#surface-report');
  const snapshot = agent.snapshot();
  if (report) report.textContent = `${snapshot.length} COMPONENTS ON THE SURFACE`;
});

const menuLog = document.querySelector<HTMLElement>('#menu-log');
document.querySelector('#actions')?.addEventListener('action', event => {
  const detail = (event as CustomEvent<{ value?: string }>).detail;
  if (menuLog) menuLog.textContent = `ACTION ${detail?.value ?? ''}`.trim();
});

const region = document.querySelector('ui-toast-region');
if (region) {
  const toaster = createToaster();
  (region as HTMLElement & { toaster: typeof toaster }).toaster = toaster;
  document.querySelector('#notify')?.addEventListener('action', () => {
    toaster('Record filed', { description: 'Designation stored in bay 1138.' });
  });
}

const resize = document.querySelector('thx-resize-observer');
const resizeOut = document.querySelector<HTMLElement>('#resize-readout');
resize?.addEventListener('thx-resize', event => {
  const detail = (event as CustomEvent<{ width: number; height: number }>).detail;
  if (resizeOut) resizeOut.textContent = `${detail.width} × ${detail.height}`;
});
