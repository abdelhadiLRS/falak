/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@/dls': path.resolve(__dirname, './src/components/dls'),
      '@/icons': path.resolve(__dirname, './public/icons'),
      '@/tests': path.resolve(__dirname, './src/tests'),
      '@/types': path.resolve(__dirname, './types'),
      '@/public': path.resolve(__dirname, './public'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@': path.resolve(__dirname, './src'),
      'src': path.resolve(__dirname, './src'),
      'types': path.resolve(__dirname, './types'),
      'i18n.json': path.resolve(__dirname, './i18n.json'),
      'next/router': path.resolve(__dirname, './src/utils/router-shim.ts'),
      'next-translate/useTranslation': path.resolve(__dirname, './src/utils/translate-shim.ts'),
      'next-translate/setLanguage': path.resolve(__dirname, './src/utils/translate-shim.ts'),
      'next/head': path.resolve(__dirname, './src/utils/head-shim.tsx'),
      'next-seo': path.resolve(__dirname, './src/utils/seo-shim.tsx'),
      'next/image': path.resolve(__dirname, './src/utils/image-shim.tsx'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api/proxy': {
        target: process.env.API_GATEWAY_URL || 'https://api.quran.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ''),
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
