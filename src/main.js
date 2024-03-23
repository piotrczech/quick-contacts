import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

async function prepareApp() {
  const { worker } = await import('./sw/worker')
  return worker.start()
}

const app = createApp(App)

app.use(router)
app.use(vuetify)

prepareApp().then(() => {
  app.mount('#app')
})
