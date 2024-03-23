import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src/sw',
      filename: 'worker.js',
      registerType: 'autoUpdate',
      manifest: {
        name: 'QuickContacts',
        short_name: 'QuickContacts',
        description: ' A phonebook app that enables fast contact search, addition, and editing.',
        theme_color: '#ffffff',
        background_color: '#212121',
        icons: [
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: '/icons/icon512_maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: '/icons/icon512_rounded.png',
            type: 'image/png'
          }
        ],
        orientation: 'portrait',
        lang: 'pl'
      },
      devOptions: {
        enabled: true
      }
    }),
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/libs/axios.js', import.meta.url))
    }
  }
})
