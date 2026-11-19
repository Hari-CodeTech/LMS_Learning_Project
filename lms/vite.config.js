
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  preview: {
    allowedHosts: [
      'kind-rebirth-production-3bd58cc2.up.railway.app'
    ]
  }
})
