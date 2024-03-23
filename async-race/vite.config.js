import Inspect from 'vite-plugin-inspect';
import path, { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoprefixer from 'autoprefixer';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';

const SRC_PATH = path.resolve(__dirname, 'src');
const SVG_FOLDER_PATH = path.resolve(SRC_PATH, 'img');

export default {
  publicDir: 'assets/',
  plugins: [
    createSvgSpritePlugin({ svgFolder: SVG_FOLDER_PATH }),
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
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        404: resolve(__dirname, './404.html'),
      },
    },
    minify: false,
    compact: false,
    sourcemap: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
};
