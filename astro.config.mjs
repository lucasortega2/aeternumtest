// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['5cb4-181-97-210-204.ngrok-free.app'],
    },
  },

  integrations: [react(), icon()],
  adapter: vercel(),
  output: 'server',
  env: {
    schema: {
      SUPABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      SUPABASE_ANON_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      ACCES_TOKEN_MP: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_KEY_MP: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
