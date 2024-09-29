import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/tourttt",
    },
    {
      path: "/tourttt",
      name: "tourttt",
      component: () => import("@/modules/menu/layouts/MenuLayout.vue"),
    },
    {
      path: "/tourttt/create",
      name: "create",
      component: () => import("@/modules/menu/layouts/CreateLayout.vue"),
    },
    {
      path: "/tourttt/gestion/:id",
      name: "gestion",
      component: () => import("@/modules/menu/layouts/GestionLayout.vue"),
      props: true
    },
  ],
});

export default router;
