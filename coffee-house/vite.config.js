/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import Inspect from 'vite-plugin-inspect';
import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default {
  publicDir: 'build',
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
        menu: resolve(__dirname, 'menu/index.html'),
      },
      output: {
        minify: false, // Отключение минификации
        compact: false, // Отключение обфускации
      },
    },
    sourcemap: true,
  },
};
