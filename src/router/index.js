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
    children: [
      {
        path: ":ejerciciosSlug",
        name: "DetallesEjercicios",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "experience" */ "../components/DetallesEjercicios"
          ),
        // beforeEnter: (to, from, next) => {
        //   const exists = this.$store.getters["exercise/findIndex"](to.params.slug);
        //   if (exists) {
        //     next();
        //   } else {
        //     next({ name: "NotFound" });
        //   }
        // },
      },
    ],
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
    path: "/email_verification",
    name: "EmailVerification",
    component: () =>
      import(
        /* webpackChunkName: "EmailVerification" */ "../views/EmailVerification.vue"
      ),
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
  const cachedToken = localStorage.getItem("USER");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (cachedToken) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
