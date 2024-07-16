import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // { path: '/', component: Landing, name: 'Landing' },
  // 이 곳에 route를 정의하면됨
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
