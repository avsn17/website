import { createClient } from '@neondatabase/neon-js';

// Simple CLI to fetch the most recent todos from the Neon data API.
// Usage:
//   NEON_DATA_API_URL="https://..." node ./dist/scripts/fetchTodos.js
// or (with ts-node):
//   NEON_DATA_API_URL="https://..." ts-node-esm scripts/fetchTodos.ts

async function main() {
  const dataApiUrl = process.env.NEON_DATA_API_URL || process.env.VITE_NEON_DATA_API_URL;
  if (!dataApiUrl) {
    console.error('NEON_DATA_API_URL (or VITE_NEON_DATA_API_URL) is not set');
    process.exit(1);
  }

  const neon = createClient({ dataApi: { url: dataApiUrl } } as Parameters<typeof createClient>[0]);

  try {
    const res = await neon.from('todos').select('*').order('id', { ascending: false }).limit(100);
    // The neon client returns a `data`/`error` shape depending on the package version.
    // Log the result in a readable form so this script is useful as a debugging aid.
    // `res` may be { data, error } or an array depending on the client; handle both.
    // @ts-ignore
    if (res.error) {
      // @ts-ignore
      console.error('Error fetching todos:', res.error);
      process.exit(1);
    }
    // @ts-ignore
    const todos = res.data ?? res;
    console.log(JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error('Unhandled error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { main };
