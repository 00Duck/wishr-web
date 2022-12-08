import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "@/assets/css/global.css"
import "@/assets/scss/global.scss"

createApp(App).use(router).mount('#app')
