import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: 正式網址確認後改這裡（canonical / sitemap / og:url 都讀這個值）
export default defineConfig({
  site: 'https://ai-persona.vercel.app',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
