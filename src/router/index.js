import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Profile"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ejercicios",
    name: "MisEjercicios",
    component: () =>
      import(/* webpackChunkName: "Ejercicios" */ "../views/MisEjercicios"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rutinas",
    name: "MisRutinas",
    component: () =>
      import(/* webpackChunkName: "MisRutinas" */ "../views/MisRutinas"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/NotFound",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

let hola = true;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (hola) {
      // Provisional hasta tener store y api
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
