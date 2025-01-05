import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    https: false, // Disable HTTPS
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
});