import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Layout.vue";
import Home from "../views/HomePage.vue";
import Login from "../views/LoginPage.vue";
import User from "../views/UserPage.vue";
import Register from "../views/RegisterPage.vue";
import About from "../views/AboutPage.vue";
import Contact from "../views/ContactPage.vue";
import Forgot from "../views/ForgotPasswordPage.vue";
import Admin from "../views/AdminPage.vue";
import Budget from "../views/BudgetPage.vue";
import BudgetNewPage from "../views/BudgetNewPage.vue";


const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const isAdmin = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'ADMIN';
  } catch (e) {
    return false;
  }
};

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/users",
        component: User,
      },
      {
        path: "/register",
        component: Register,
      },
      {
        path: "/about",
        component: About,
      },
      {
        path: "/contact",
        component: Contact,
      },
      {
        path: "/budget",
        component: Budget,
      },
      {
        path: "budget/new",
        component: BudgetNewPage,
      },
      {
        path: "/forgot-password",
        component: Forgot,
      },
      {
        path: "/admin",
        component: Admin,
        beforeEnter: (to, from, next) => {
          if (isAuthenticated()) {
            if (isAdmin()) {
              next();
            } else {
              next("/");
            }
          } else {
            next("/login");
          }
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
