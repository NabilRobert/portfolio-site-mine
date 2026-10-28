import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import { createAppRouter } from './router'
import '@fontsource-variable/archivo/wdth.css'
import './styles/main.css'

createApp(App).use(createAppRouter()).use(createHead()).mount('#app')
