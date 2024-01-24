import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Alias, defineConfig } from 'vite';
import * as tsconfig from './tsconfig.path.json';
import * as path from 'path';

// https://vitejs.dev/config/
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


export function readAliasFromTsConfig(): Alias[] {
  const pathReplaceRegex = new RegExp(/\/\*$/, '');

  return Object.entries(tsconfig.compilerOptions.paths).reduce(
      (aliases, [fromPaths, toPaths]) => {
        const find = fromPaths.replace(pathReplaceRegex, '');
        const toPath = toPaths[0].replace(pathReplaceRegex, '');
        const replacement = path.resolve(__dirname, toPath);
        aliases.push({ find, replacement });
        return aliases;
      },
      [] as Alias[]
  );
}