import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '../../pages/home-page/index.vue';
import ConvertPage from '../../pages/convert-page/index.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/convert', component: ConvertPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
