import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias '@' → './src'
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0', 
    strictPort: true, 
  },
})
