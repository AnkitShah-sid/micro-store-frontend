import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server:{
    host: '0.0.0.0', // Accept connections from any network interface
    port: 3000, // Default port
    strictPort: true // Ensure the port doesn't change
  }
})
