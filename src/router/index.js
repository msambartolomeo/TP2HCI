import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/inicio",
    name: "Inicio",
    component: () =>
      import(/* webpackChunkName: "Inicio" */ "../views/Home.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: ":slug",
        name: "DetallesRutinas",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "DetallesRutinas" */ "../components/DetallesRutinas"
          ),
        beforeEnter: (to, from, next) => {
          if (to.params.routine) {
            const exists = store.getters["routines/findIndex"](
              to.params.routine.id
            );
            if (exists === -1) {
              next("/inicio");
            } else {
              next();
            }
          } else {
            next("/inicio");
          }
        },
      },
    ],
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
    children: [
      {
        path: ":slug",
        name: "DetallesEjercicios",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "DetallesEjercicios" */ "../components/DetallesEjercicios"
          ),
        beforeEnter: (to, from, next) => {
          if (to.params.exercise) {
            const exists = store.getters["exercise/findIndex"](
              to.params.exercise.id
            );
            if (exists === -1) {
              next("/ejercicios");
            } else {
              next();
            }
          } else {
            next("/ejercicios");
          }
        },
      },
    ],
  },
  {
    path: "/rutinas",
    name: "MisRutinas",
    component: () =>
      import(/* webpackChunkName: "MisRutinas" */ "../views/MisRutinas"),
    meta: { requiresAuth: true },
    children: [
      {
        path: ":slug",
        name: "DetallesMisRutinas",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "DetallesMisRutinas" */ "../components/DetallesMisRutinas"
          ),
        beforeEnter: (to, from, next) => {
          if (to.params.routine) {
            const exists = store.getters["routines/findIndex"](
              to.params.routine.id
            );
            if (exists === -1) {
              next("/rutinas");
            } else {
              next();
            }
          } else {
            next("/rutinas");
          }
        },
      },
    ],
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
      next("/inicio");
      return;
    }
    next();
  } else next();
});

export default router;
