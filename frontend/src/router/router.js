import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/signup",
    component: () => import("../views/SignUpView.vue"),
  },
  {
    path: "/main",
    component: () => import("../views/MainView.vue"),
  },
  // {
  //   path: "/:catchAll(.*)",
  //   component: () => import("../views/NotFoundPage.vue"),
  // },
  {
    path: "/write",
    component: () => import("../views/PostContentView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
