import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

const ENV_PATH = './env';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  envDir: resolve(__dirname, ENV_PATH),
  server: {
    // port: parseInt(process.env.VITE_APP_PORT) || 3000,
  },
});
