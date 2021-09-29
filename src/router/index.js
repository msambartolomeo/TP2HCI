import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MisEjercicios from "@/views/MisEjercicios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Home,
  },
  {
    path: "/new",
    name: "MisEjercicios",
    component: MisEjercicios,
  },
  {
    path: "/*",
    name: "NotFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
