import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.124.69', // Explicitly bind to this IP address
    port: 3000, // Default port
    strictPort: true, // Ensure the port doesn't change
    hmr: {
      host: '192.168.124.69', // Use the same IP for HMR
      protocol: 'ws', // Use 'wss' if you're using HTTPS
    },
  },
});
