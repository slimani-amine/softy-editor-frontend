import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { PWAConfig } from './src/lib/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), VitePWA(PWAConfig)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
