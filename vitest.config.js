import { defineConfig } from 'vitest/config';

/// <reference types="vitest" />
export default defineConfig({
    test: {
        exclude: [
            'node_modules/**/*',
            'dist/**/*',
            'coverage/**/*',
            '.yarn/',
            './eslintrc.js',
            'src/types/**/*',
            'server.js',
        ],
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        globals: true,
        watch: false,
        minThreads: 1,
        maxThreads: 4,
        testTimeout: 10000,
        coverage: {
            exclude: [
                'node_modules/**/*',
                'dist/**/*',
                'coverage/**/*',
                '.yarn/',
                './eslintrc.js',
                'test/**/*',
                'src/types/**/*',
                'server.js',
                "src/components/**/*", // For now, we don't test components
                "src/views/**/*", // For now, we don't test containers
            ],
            all: true,
            enabled: false,
            provider: 'v8',
            clean: true,
            reporter: ['text', 'lcov', 'html'],
        },
        open: true,
        mockReset: true,
        setupFiles: ['./test/setupTests.ts'],
        //environment: 'jsdom',
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
},
    },
});