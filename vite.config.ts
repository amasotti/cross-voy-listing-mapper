/// <reference types="vitest" />
// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
    build: {
      outDir: './dist'
    },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  test: {
    exclude: ['**/node_modules/**', '**/dist/**']
  },
  base: '/cross-voy-listing-mapper/'
})
