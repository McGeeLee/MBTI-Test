import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/chart.js/') || id.includes('/node_modules/react-chartjs-2/')) {
            return 'charts'
          }
          if (id.includes('/node_modules/framer-motion/')) {
            return 'motion'
          }
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-router')
          ) {
            return 'react'
          }
        },
      },
    },
  },
  plugins: [react()],
})
