// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://gik0geck0.github.io',
  base: '/astro-tools',
  integrations: [preact()]
});