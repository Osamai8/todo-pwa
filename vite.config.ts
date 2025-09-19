import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/todo-pwa/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png'
      ],
      manifest: {
        name: 'Todo PWA',
        short_name: 'Todo',
        description: 'A simple TODO app built with React and Vite',
        theme_color: '#171717',
        background_color: '#f0e7db',
        display: 'standalone',
        orientation: 'portrait',
        scope: '.',
        start_url: '.',
        icons: [
          {
            src: 'android-chrome-192x192.png', // ✅ no leading slash
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
  ]
})