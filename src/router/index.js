import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () =>
      import(/* webpackChunkName: "Inicio" */ "../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/user/Profile"),
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
      import(/* webpackChunkName: "login" */ "../views/user/Login.vue"),
    meta: { forVisitors: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/user/Register.vue"),
    meta: { forVisitors: true },
  },
  {
    path: "/email_verification",
    name: "EmailVerification",
    component: () =>
      import(
        /* webpackChunkName: "EmailVerification" */ "../views/user/EmailVerification.vue"
      ),
    meta: { forVisitors: true },
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

router.beforeEach((to, from, next) => {
  const cachedToken = localStorage.getItem("TOKEN");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (cachedToken) {
      next();
      return;
    }
    next({ name: "Login", query: { redirect: to.path } });
  } else if (to.matched.some((record) => record.meta.forVisitors)) {
    if (cachedToken) {
      next("/");
      return;
    }
    next();
  } else next();
});

export default router;
