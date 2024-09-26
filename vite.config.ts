/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/test-task-pics-io/',
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: 'vitest.setup.ts',
        coverage: {
            include: ['src/**/*.{ts,tsx}'],
            exclude: [],
        },
    },
})
