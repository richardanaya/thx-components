import type { createAgent } from '@ui-sdk/web/agent';

type Agent = ReturnType<typeof createAgent>;

declare global {
  interface Window {
    __thxAgent: Agent;
  }
}

export {};
