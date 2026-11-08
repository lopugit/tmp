import { defineNitroConfig } from 'nitropack/config';
export default defineNitroConfig({
  compatibilityDate: '2026-11-08',
  publicAssets: [{ dir: new URL('./dist', import.meta.url).pathname }],
});
