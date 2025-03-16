import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/LoginPage.vue';
import Dashboard from '../views/DashboardPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({history: createWebHashHistory(), routes});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) next('/login');
  else next();
});

export default router;