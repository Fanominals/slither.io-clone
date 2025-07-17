import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Enable polyfills for specific globals and modules
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Enable polyfills for specific modules
      protocolImports: true,
    })
  ],
  root: 'client',
  envDir: '../', // Look for .env files in the project root
  build: {
    outDir: '../dist-client',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@common': '/src/common',
      '@components': '/src/components',
      '@game': '/src/game',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@types': '/src/types',
      '@utils': '/src/utils',
    },
  },
  define: {
    global: 'globalThis',
  },
}) 