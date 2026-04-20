// @ts-check

/**
 * @fileoverview THX 1138 styled line chart component (Tektronix oscilloscope style)
 * @module thx-chart-line
 */

import { LitElement, html, svg, css } from 'lit';

/**
 * @typedef {Object} LineSeries
 * @property {string} name
 * @property {string} color
 * @property {number[]} data
 * @property {string} [dasharray]
 * @property {boolean} [outlined=false]
 */

/**
 * @typedef {Object} LineChartData
 * @property {string[]} labels
 * @property {LineSeries[]} series
 * @property {number} [min=0]
 * @property {number} [max=100]
 */

/**
 * THX 1138 styled line chart component
 * @extends {LitElement}
 */
export class ThxChartLine extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
    }

    .chart-container {
      position: relative;
      width: 100%;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .grid-line {
      stroke: rgba(166, 200, 225, 0.15);
      stroke-width: 1;
    }

    .axis {
      stroke: var(--atmos-secondary, #707e91);
      stroke-width: 2;
    }

    .axis-label {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 9px;
      fill: var(--atmos-secondary, #707e91);
      text-transform: uppercase;
    }

    .legend-text {
      font-family: var(--font-mono, 'Courier New', Courier, monospace);
      font-size: 8px;
      fill: var(--atmos-secondary, #707e91);
      text-transform: uppercase;
    }

    .series-line {
      fill: none;
      stroke-width: 2;
      filter: drop-shadow(0 0 2px currentColor);
    }

    .data-point {
      stroke-width: 2;
    }

    .data-point.outlined {
      fill: #0a0a0a;
    }

    .diamond {
      stroke-width: 0;
    }
  `;

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      data: { type: Object },
      width: { type: Number },
      height: { type: Number },
    };
  }

  constructor() {
    super();
    /** @type {LineChartData} */
    this.data = /** @type {LineChartData} */ ({
      labels: [],
      series: [],
      min: 0,
      max: 100,
    });
    this.width = 440;
    this.height = 180;
  }

  // Plot-area geometry. The viewBox is 440x180 but we reserve a
  // fixed gutter on the right (PLOT_RIGHT -> LEGEND area) so the
  // legend never overlaps the rightmost data points.
  static PLOT_LEFT = 50;
  static PLOT_RIGHT = 310;
  static PLOT_TOP = 20;
  static PLOT_BOTTOM = 160;
  static LEGEND_X = 320;
  static LEGEND_Y = 25;

  /**
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  _scaleY(value, min, max) {
    const chartHeight = ThxChartLine.PLOT_BOTTOM - ThxChartLine.PLOT_TOP;
    const percent = (value - min) / (max - min);
    return ThxChartLine.PLOT_TOP + chartHeight - percent * chartHeight;
  }

  /**
   * Uniformly distribute points across the plot area. The previous
   * hard-coded non-uniform positions pushed the last point out past
   * where the legend now lives.
   * @param {number} index
   * @param {number} total
   * @returns {number}
   */
  _scaleX(index, total) {
    const left = ThxChartLine.PLOT_LEFT;
    const right = ThxChartLine.PLOT_RIGHT;
    if (total <= 1) return left;
    return left + (index / (total - 1)) * (right - left);
  }

  /**
   * @param {LineSeries} series
   * @returns {string}
   */
  _buildPolyline(series) {
    const min = this.data.min ?? 0;
    const max = this.data.max ?? 100;
    const points = series.data.map((val, i) => {
      const x = this._scaleX(i, series.data.length);
      const y = this._scaleY(val, min, max);
      return `${x},${y}`;
    });
    return points.join(' ');
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {string}
   */
  _buildDiamond(x, y) {
    const size = 4;
    return `${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}`;
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    const data = this.data;
    const min = data.min ?? 0;
    const max = data.max ?? 100;
    const labels = data.labels || [];
    const series = data.series || [];

    return html`
      <div class="chart-container">
        <svg viewBox="0 0 ${this.width} ${this.height}" preserveAspectRatio="xMidYMid meet">
          <!-- Grid lines (bounded to the plot area, never cross into the legend gutter) -->
          <g class="grid">
            ${[30, 60, 90, 120, 150].map(
              y => svg`
                <line
                  x1="${ThxChartLine.PLOT_LEFT}"
                  y1="${y}"
                  x2="${ThxChartLine.PLOT_RIGHT}"
                  y2="${y}"
                  class="grid-line"
                />
              `
            )}
            ${(labels.length > 1 ? labels : []).map((_, i) => {
              if (i === 0 || i === labels.length - 1) return '';
              const x = this._scaleX(i, labels.length);
              return svg`
                <line
                  x1="${x}"
                  y1="${ThxChartLine.PLOT_TOP}"
                  x2="${x}"
                  y2="${ThxChartLine.PLOT_BOTTOM}"
                  class="grid-line"
                />
              `;
            })}
          </g>

          <!-- Axes -->
          <line
            x1="${ThxChartLine.PLOT_LEFT}"
            y1="${ThxChartLine.PLOT_TOP}"
            x2="${ThxChartLine.PLOT_LEFT}"
            y2="${ThxChartLine.PLOT_BOTTOM}"
            class="axis"
          />
          <line
            x1="${ThxChartLine.PLOT_LEFT}"
            y1="${ThxChartLine.PLOT_BOTTOM}"
            x2="${ThxChartLine.PLOT_RIGHT}"
            y2="${ThxChartLine.PLOT_BOTTOM}"
            class="axis"
          />

          <!-- Y-axis labels -->
          <text x="40" y="25" text-anchor="end" class="axis-label">${max}</text>
          <text x="40" y="50" text-anchor="end" class="axis-label">${Math.round(max * 0.8)}</text>
          <text x="40" y="75" text-anchor="end" class="axis-label">${Math.round(max * 0.6)}</text>
          <text x="40" y="100" text-anchor="end" class="axis-label">${Math.round(max * 0.4)}</text>
          <text x="40" y="125" text-anchor="end" class="axis-label">${Math.round(max * 0.2)}</text>
          <text x="40" y="165" text-anchor="end" class="axis-label">${min}</text>

          <!-- X-axis labels -->
          ${labels.map(
            (label, i) => svg`
              <text
                x="${this._scaleX(i, labels.length)}"
                y="175"
                text-anchor="middle"
                class="axis-label"
              >
                ${label}
              </text>
            `
          )}

          <!-- Series -->
          ${series.map(
            s => svg`
              <polyline
                fill="none"
                stroke="${s.color}"
                stroke-width="2"
                stroke-dasharray="${s.dasharray || 'none'}"
                points="${this._buildPolyline(s)}"
                class="series-line"
              />

              ${s.data.map((val, i) => {
                const x = this._scaleX(i, s.data.length);
                const y = this._scaleY(val, min, max);
                if (s.outlined) {
                  return svg`
                    <circle
                      cx="${x}"
                      cy="${y}"
                      r="3"
                      fill="none"
                      stroke="${s.color}"
                      stroke-width="2"
                    />
                  `;
                }
                return svg` <circle cx="${x}" cy="${y}" r="4" fill="${s.color}" /> `;
              })}
            `
          )}

          <!-- Legend (lives in the reserved right-hand gutter) -->
          ${series.length > 0
            ? svg`
                <g transform="translate(${ThxChartLine.LEGEND_X}, ${ThxChartLine.LEGEND_Y})">
                  ${series.map(
                    (s, i) => svg`
                      <line
                        x1="0"
                        y1="${i * 14}"
                        x2="16"
                        y2="${i * 14}"
                        stroke="${s.color}"
                        stroke-width="2"
                        stroke-dasharray="${s.dasharray || 'none'}"
                      />
                      <text x="20" y="${i * 14 + 4}" class="legend-text">${s.name}</text>
                    `
                  )}
                </g>
              `
            : ''}
        </svg>
      </div>
    `;
  }
}

customElements.define('thx-chart-line', ThxChartLine);
