import './assets/css/main.css'
import 'primeicons/primeicons.css'
import { AppPreset } from './assets/css/preset'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: AppPreset,
    options: {
      darkModeSelector: 'light',
    }
  }
});

app.use(createPinia())
app.use(router)

app.mount('#app')
