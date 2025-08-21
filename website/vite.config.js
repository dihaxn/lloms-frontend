import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'global': 'window'
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
