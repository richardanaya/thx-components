import { defineConfig } from 'vite';

export default defineConfig({
  root: 'demo',
  server: { host: '127.0.0.1', port: 4173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    outDir: '../dist/demo',
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
  },
});
