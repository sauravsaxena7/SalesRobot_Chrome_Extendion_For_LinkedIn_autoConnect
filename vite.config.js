import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        main: resolve(__dirname, 'index.html'),
        // eslint-disable-next-line no-undef
        background: resolve(__dirname, 'public/background.js'),
        // eslint-disable-next-line no-undef
        contentScript: resolve(__dirname, 'public/contentScript.js')
      }
    }
  }
});
