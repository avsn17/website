import { createClient } from '@neondatabase/neon-js';
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react/adapters';

export const neon = createClient({
  auth: {
    url: (import.meta as ImportMeta & {
      env: { VITE_NEON_AUTH_URL: string };
    }).env.VITE_NEON_AUTH_URL,
    adapter: BetterAuthReactAdapter(),
  },
} as Parameters<typeof createClient>[0]);