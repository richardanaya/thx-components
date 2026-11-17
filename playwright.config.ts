import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'test',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  retries: 0,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:4173',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
