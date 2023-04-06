import { createApp } from 'vue'
import router from './router/index.js'
import store from './store/index.js'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import VueMask from '@devindex/vue-mask';
import {createI18n,useI18n} from 'vue-i18n';
import 'element-plus/dist/index.css'
import { languages } from './locales/index.js'

const messages= Object.assign(languages)
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'ru',
    messages
})
const app = createApp(App)

app.use(VueMask).use(i18n).use(router).use(store).use(ElementPlus).mount('#app')
