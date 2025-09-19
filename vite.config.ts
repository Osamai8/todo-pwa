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
        'apple-touch-icon.png',
        'robots.txt',
        '*.svg'
      ],
      manifest: {
        name: 'Todo PWA',
        short_name: 'Todo',
        description: 'A simple TODO app built with React and Vite',
        theme_color: '#171717',
        background_color: '#f0e7db',
        display: 'standalone',
        orientation: 'portrait',
        categories: ['productivity', 'utilities'],
        scope: '/todo-pwa/',
        start_url: '/todo-pwa/',
        icons: [
          {
            src: 'pwa-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
})