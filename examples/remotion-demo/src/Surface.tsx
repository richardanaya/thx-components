import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { useLayoutEffect, useRef } from 'react';
import 'thx-components';
import 'thx-components/aesthetics.css';
import './film.css';
import { Cursor, DialogCursor, cursorPoint } from './Cursor';
type LineElement = HTMLElement & { api?: { setValue: (value: number[]) => void } };
type GaugeElement = HTMLElement & { api?: { setValue: (value: number) => void } };
type TabsElement = HTMLElement & { value?: string; api?: { select: (value: string) => void } };
type DialogElement = HTMLElement & { open?: boolean };
type SwitchElement = HTMLElement & { checked?: boolean };
type SliderElement = HTMLElement & { value?: number | string };
import {
  BAYS_AT,
  CLOSE_AT,
  CONFIRM_AT,
  DESIGNATION,
  END_AT,
  FILE_AT,
  RECORD_AT,
  TYPE_START,
  alertCopy,
  alertVariant,
  byteValue,
  clicking,
  gaugeValue,
  ledStatus,
  logLine,
  progressValue,
  series,
  tabFor,
  typedText,
} from './timeline';

function press(mark: string, down: boolean) {
  const host = document.querySelector(`[data-mark="${mark}"]`);
  const button = host?.querySelector('button') ?? host;
  if (button instanceof HTMLElement) {
    if (down) button.setAttribute('data-film-pressed', '');
    else button.removeAttribute('data-film-pressed');
  }
}

export function Surface() {
  const frame = useCurrentFrame();
  const tabsRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const gaugeRef = useRef<HTMLElement>(null);
  const monitorsRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const meterRef = useRef<HTMLElement>(null);
  const bytesRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLElement>(null);
  const alertRef = useRef<HTMLElement>(null);
  const ledsRef = useRef<HTMLElement>(null);
  const switchRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const tab = tabFor(frame);
  const typed = typedText(frame);
  const variant = alertVariant(frame);
  const dialogOpen = frame >= FILE_AT + 8 && frame < CLOSE_AT + 8;
  const point = cursorPoint(frame);
  const notes =
    frame < CONFIRM_AT
      ? 'Sector clear.'
      : `Sector clear. Designation ${DESIGNATION} accepted for the east bay.`;

  useLayoutEffect(() => {
    const tabs = tabsRef.current as TabsElement | null;
    if (tabs) {
      if (tabs.api?.select) tabs.api.select(tab);
      else tabs.value = tab;
    }

    (lineRef.current as LineElement | null)?.api?.setValue(series(frame, 0, 8));
    (barRef.current as LineElement | null)?.api?.setValue(series(frame, 50, 6));
    (gaugeRef.current as GaugeElement | null)?.api?.setValue(gaugeValue(frame));

    const load = String(progressValue(frame));
    monitorsRef.current?.setAttribute(
      'channels',
      `ALPHA:${series(frame, 10, 6).join(',')}|BETA:${series(frame, 30, 6).join(',')}|GAMMA:${series(frame, 70, 6).join(',')}`
    );
    progressRef.current?.setAttribute('value', load);
    meterRef.current?.setAttribute('value', String(gaugeValue(frame)));
    bytesRef.current?.setAttribute('value', String(byteValue(frame)));
    numberRef.current?.setAttribute('value', String(1138 + (frame % 40)));
    alertRef.current?.setAttribute('variant', variant);

    ledsRef.current?.querySelectorAll('thx-led').forEach((led, index) => {
      led.setAttribute('status', ledStatus(frame, index));
    });
    document.querySelectorAll('[data-bay]').forEach((bay, index) => {
      const wave = 35 + 30 * Math.sin((frame + index * 28) / 20);
      bay.setAttribute('value', String(Math.round(wave + index * 8)));
    });

    const toggle = switchRef.current as SwitchElement | null;
    if (toggle) toggle.checked = frame % 80 < 50;
    const slider = sliderRef.current as SliderElement | null;
    if (slider) slider.value = Math.round(30 + 40 * (0.5 + 0.5 * Math.sin(frame / 24)));

    const dialog = dialogRef.current as DialogElement | null;
    if (dialog && dialog.open !== dialogOpen) dialog.open = dialogOpen;

    const content = contentRef.current;
    if (content) {
      const shown = interpolate(
        frame,
        [FILE_AT, FILE_AT + 14, CLOSE_AT, CLOSE_AT + 12],
        [0, 1, 1, 0],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      );
      content.style.opacity = String(shown);
      content.style.transform = `translateY(${(1 - shown) * 16}px)`;
    }

    press('confirm', clicking(frame, CONFIRM_AT));
    press('bays', clicking(frame, BAYS_AT));
    press('record', clicking(frame, RECORD_AT));
    press('file', clicking(frame, FILE_AT));
    press('close', clicking(frame, CLOSE_AT));
  });

  const titleOpacity = interpolate(frame, [0, 16, 78, 108], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const endOpacity = interpolate(frame, [END_AT, END_AT + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const consoleOpacity = interpolate(frame, [70, 108, END_AT, END_AT + 16], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <div className="stage" style={{ opacity: consoleOpacity }}>
        <header className="mast">
          <div>
            <p className="kicker">// System // LDS-1138</p>
            <h1>THX 1138</h1>
          </div>
          <div className="readouts">
            <div className="identity">
              <ui-avatar>
                <ui-avatar-fallback>THX</ui-avatar-fallback>
              </ui-avatar>
              <ui-avatar>
                <ui-avatar-fallback>LUH</ui-avatar-fallback>
              </ui-avatar>
            </div>
            <thx-badge variant={frame < 140 ? 'neutral' : 'primary'}>
              {frame < 140 ? 'Standby' : 'Live'}
            </thx-badge>
            <span>
              <thx-format-bytes ref={bytesRef} value="48000"></thx-format-bytes>
            </span>
            <span>
              <thx-format-number ref={numberRef} value="1138"></thx-format-number>
            </span>
          </div>
        </header>

        <ui-tabs ref={tabsRef} default-value="signal">
          <ui-tabs-list aria-label="Console">
            <ui-tabs-tab value="signal" data-mark="signal">
              <button type="button">Signal</button>
            </ui-tabs-tab>
            <ui-tabs-tab value="bays" data-mark="bays">
              <button type="button">Bays</button>
            </ui-tabs-tab>
            <ui-tabs-tab value="record" data-mark="record">
              <button type="button">Record</button>
            </ui-tabs-tab>
          </ui-tabs-list>

          <ui-tabs-panel value="signal">
            <div className="panel signal">
              <thx-crt variant="scope" label="LDS-1138">
                <thx-crt-label>LDS-1138 // signal</thx-crt-label>
                <thx-crt-screen>
                  <div className="scope-grid">
                    <thx-scope-line
                      ref={lineRef}
                      label="Alpha"
                      default-value="12,40,28,66,30,72,44,38"
                    ></thx-scope-line>
                    <thx-scope-bar
                      ref={barRef}
                      label="Load"
                      default-value="20,55,40,80,35,48"
                    ></thx-scope-bar>
                    <thx-scope-gauge
                      ref={gaugeRef}
                      label="Core"
                      default-value="67"
                    ></thx-scope-gauge>
                    <thx-scope-monitors
                      ref={monitorsRef}
                      label="Bays"
                      channels="ALPHA:12,40,28,60,22,48|BETA:8,22,70,30,44,18|GAMMA:44,41,38,52,30,36"
                    ></thx-scope-monitors>
                  </div>
                </thx-crt-screen>
              </thx-crt>
              <div className="meters">
                <ui-progress ref={progressRef} value="24" aria-label="Transfer">
                  <ui-progress-label>Transfer</ui-progress-label>
                  <ui-progress-value></ui-progress-value>
                  <ui-progress-track>
                    <ui-progress-indicator></ui-progress-indicator>
                  </ui-progress-track>
                </ui-progress>
                <ui-meter ref={meterRef} value="67" data-variant="ring" aria-label="Core load">
                  <ui-meter-label>Core</ui-meter-label>
                  <ui-meter-value></ui-meter-value>
                  <ui-meter-track>
                    <ui-meter-indicator></ui-meter-indicator>
                  </ui-meter-track>
                </ui-meter>
              </div>
            </div>
          </ui-tabs-panel>

          <ui-tabs-panel value="bays">
            <div className="panel bays">
              <section className="card">
                <h2>Bay lamps</h2>
                <thx-leds ref={ledsRef} label="Bay status">
                  <thx-led status="ok"></thx-led>
                  <thx-led status="warn"></thx-led>
                  <thx-led status="off"></thx-led>
                  <thx-led status="error"></thx-led>
                </thx-leds>
                <div className="row">
                  <thx-badge variant="primary">East</thx-badge>
                  <thx-badge variant="secondary">West</thx-badge>
                  <thx-badge variant="warning">North</thx-badge>
                  <thx-badge variant="error">Gate</thx-badge>
                </div>
                <p>Phosphor stock is held in bay 4. The west lamp follows the sweep.</p>
                <ui-progress data-bay="east" value="64" aria-label="East load">
                  <ui-progress-label>East</ui-progress-label>
                  <ui-progress-value></ui-progress-value>
                  <ui-progress-track>
                    <ui-progress-indicator></ui-progress-indicator>
                  </ui-progress-track>
                </ui-progress>
                <ui-progress data-bay="west" value="40" aria-label="West load">
                  <ui-progress-label>West</ui-progress-label>
                  <ui-progress-value></ui-progress-value>
                  <ui-progress-track>
                    <ui-progress-indicator></ui-progress-indicator>
                  </ui-progress-track>
                </ui-progress>
                <ui-progress data-bay="gate" value="18" aria-label="Gate load">
                  <ui-progress-label>Gate</ui-progress-label>
                  <ui-progress-value></ui-progress-value>
                  <ui-progress-track>
                    <ui-progress-indicator></ui-progress-indicator>
                  </ui-progress-track>
                </ui-progress>
              </section>
              <section className="card">
                <h2>Gain</h2>
                <label className="choice">
                  <ui-switch ref={switchRef} default-checked>
                    <ui-switch-thumb></ui-switch-thumb>
                  </ui-switch>
                  Accept monitoring
                </label>
                <ui-slider ref={sliderRef} default-value="42" aria-label="Gain">
                  <ui-slider-value></ui-slider-value>
                  <ui-slider-control>
                    <ui-slider-track>
                      <ui-slider-indicator></ui-slider-indicator>
                      <ui-slider-thumb aria-label="Gain"></ui-slider-thumb>
                    </ui-slider-track>
                  </ui-slider-control>
                </ui-slider>
              </section>
            </div>
          </ui-tabs-panel>

          <ui-tabs-panel value="record">
            <div className="panel record">
              <section className="card">
                <h2>Designation</h2>
                <ui-field name="designation">
                  <ui-field-label>Designation</ui-field-label>
                  <ui-input>
                    <input
                      data-mark="designation"
                      value={typed}
                      readOnly
                      aria-label="Designation"
                    />
                  </ui-input>
                  <ui-field-description>Filed with the bureau.</ui-field-description>
                </ui-field>
                <ui-field name="notes">
                  <ui-field-label>Notes</ui-field-label>
                  <ui-textarea>
                    <textarea rows={4} value={notes} readOnly aria-label="Notes" />
                  </ui-textarea>
                </ui-field>
                <div className="row">
                  <ui-button data-mark="confirm">
                    <button type="button" data-variant="primary">
                      Confirm
                    </button>
                  </ui-button>
                  <ui-button data-mark="file">
                    <button type="button" data-variant="secondary">
                      File record
                    </button>
                  </ui-button>
                </div>
              </section>
              <section className="card">
                <h2>Status</h2>
                <thx-alert ref={alertRef} variant={variant} default-open>
                  <span>{alertCopy(frame)}</span>
                </thx-alert>
                <p className="kicker">
                  {frame < TYPE_START
                    ? 'Cursor approaching the record.'
                    : `Keystroke ${typed.length} / ${DESIGNATION.length}`}
                </p>
              </section>
            </div>
          </ui-tabs-panel>
        </ui-tabs>

        <p className="log">{logLine(frame)}</p>

        <ui-dialog ref={dialogRef} id="file-dialog" modal="false">
          <ui-dialog-backdrop hidden></ui-dialog-backdrop>
          <ui-dialog-content ref={contentRef} hidden>
            <ui-dialog-title>Project details</ui-dialog-title>
            <ui-dialog-description>
              Review {typed || 'the designation'} before filing. The east bay keeps the phosphor
              stock.
            </ui-dialog-description>
            <ui-dialog-close data-mark="close">
              <button type="button">Close</button>
            </ui-dialog-close>
            {dialogOpen ? <DialogCursor frame={frame} clicking={point.clicking} /> : null}
          </ui-dialog-content>
        </ui-dialog>

        {dialogOpen ? null : <Cursor x={point.x} y={point.y} clicking={point.clicking} />}
      </div>

      <div className="veil" style={{ opacity: titleOpacity }}>
        <div className="title-block">
          <p className="kicker">// UI SDK 0.1.0-beta.7</p>
          <h1>THX 1138</h1>
          <p>A clinical control surface. The behavior is the SDK. The phosphor is the theme.</p>
        </div>
      </div>

      <div className="veil" style={{ opacity: endOpacity }}>
        <div className="end-block">
          <p className="kicker">// Unit 1138 // Status nominal</p>
          <h1>Filed</h1>
          <p>Designation {DESIGNATION}. Sector clear.</p>
        </div>
      </div>
    </AbsoluteFill>
  );
}
