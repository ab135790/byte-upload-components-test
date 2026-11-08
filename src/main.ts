import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import plugins from './test.plugin.ts';

import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).use(plugins)

app.mount('#app')
