/* eslint-disable import/no-extraneous-dependencies */
import Inspect from 'vite-plugin-inspect';
import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoprefixer from 'autoprefixer';

export default {
  publicDir: 'assets',
  plugins: [
    Inspect(),
    ViteImageOptimizer({
      png: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
      webp: {
        quality: 70,
      },
    }),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    minify: false,
    compact: false,
    sourcemap: true,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
};
