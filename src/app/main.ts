import { createApp } from 'vue';
import './styles/style.css';
import Providers from './providers/index.vue';
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();

createApp(Providers).use(router).use(pinia).mount('#app');
