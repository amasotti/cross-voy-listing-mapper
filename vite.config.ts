import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {  defineConfig } from 'vite';
import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
    build: {
    outDir: './dist',
    },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  base: '/cross-voy-listing-mapper/'
})
