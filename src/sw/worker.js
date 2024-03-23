import { setupWorker } from 'msw/browser'
import handlers from './mocks/handlers'

// Vite PWA https://vite-pwa-org.netlify.app/guide/inject-manifest.html#advanced-injectmanifest
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
// Cleanup Outdated Caches
cleanupOutdatedCaches()
// Service Worker Code
precacheAndRoute(self.__WB_MANIFEST || [])

export const worker = setupWorker(...handlers)
