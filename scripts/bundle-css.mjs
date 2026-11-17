import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const theme = readFileSync(new URL('../src/theme/aesthetics.css', import.meta.url), 'utf8');
const sdk = readFileSync(
  new URL('../node_modules/@ui-sdk/core/dist/web.css', import.meta.url),
  'utf8'
);
const bundled = theme.replace('@import "@ui-sdk/core/web.css";', sdk);
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/aesthetics.css', import.meta.url), bundled);
