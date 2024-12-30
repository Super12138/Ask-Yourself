import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../pages/ListPage.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: HomeView,
    },
    {
      path: '/test/',
      name: 'test',
      component: () => import('../pages/TestPage.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../pages/SettingsPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/404ErrorPage.vue'),
    }
  ],
});

export default router;