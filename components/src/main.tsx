import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { createAuthClient } from '@neondatabase/neon-js/auth';
import '@neondatabase/neon-js/ui/css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './src/app';

const authClient = createAuthClient(
  (import.meta as ImportMeta & { env: { VITE_NEON_AUTH_URL: string } }).env
    .VITE_NEON_AUTH_URL
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NeonAuthUIProvider emailOTP authClient={authClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NeonAuthUIProvider>
  </StrictMode>
);
