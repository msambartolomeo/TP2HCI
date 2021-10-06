import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Home,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Profile"),
  },
  {
    path: "/ejercicios",
    name: "MisEjercicios",
    component: () =>
      import(/* webpackChunkName: "Ejercicios" */ "../views/MisEjercicios"),
  },
  {
    path: "/rutinas",
    name: "MisRutinas",
    component: () =>
      import(/* webpackChunkName: "MisRutinas" */ "../views/MisRutinas"),
  },
  {
    path: "/*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
