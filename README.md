# Quick Contacts

A Vue.js 3 phonebook app with Vuetify components, optimized as a PWA. Enables fast contact search, addition, and editing.

This project uses `vuetify` to style components. For serving the PWA, the project utilizes the combined `vite-plugin-pwa` plugin with `msw` to enable simple REST mockups. Additionally, all project components are unit tested using the vitest environment.

## Project Setup

```sh
npm install
npm run build
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

To expose localhost for testing PWA on mobile devices, run:

```sh
npm run dev -- --host
```

Note: You'll need to download the application using your mobile browser's options menu as localhost is served over HTTP, which won't trigger a notification.

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests

```sh
npm run test:unit
```
