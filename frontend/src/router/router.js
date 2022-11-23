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
  {
    path: "/post/:id",
    component: () => import("../components/PostDetail.vue"),
  },
  {
    path: "/post/update/:id",
    component: () => import("../views/UpDateView.vue"),
  },
  // {
  //   path: "/:catchAll(.*)",
  //   component: () => import("../views/NotFoundPage.vue"),
  // },
  {
    path: "/write",
    component: () => import("../views/PostContentView.vue"),
  },
  {
    path: "/post/ownpoem",
    component: () => import("../components/PostOwnPoem.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
