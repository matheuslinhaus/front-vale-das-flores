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
import AdminBuget from "../views/AdminBudgetPage.vue";
import Budget from "../views/BudgetPage.vue";
import BudgetNewPage from "../views/BudgetNewPage.vue";
import AdminRegisterProduct from "../views/AdminRegisterProductPage.vue"
import AdminProductColor from "../views/AdminProductColorPage.vue"
import AdminProductMaterial from "../views/AdminProductMaterialPage.vue"
import AdminProductType from "../views/AdminProductTypePage.vue"

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
      {
        path: "/admin/budget-list",
        component: AdminBuget,
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
      {
        path: "/admin/register-product",
        component: AdminRegisterProduct,
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

      {
        path: "/admin/product-color",
        component: AdminProductColor,
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
      {
        path: "/admin/product-material",
        component: AdminProductMaterial,
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

      {
        path: "/admin/product-type",
        component: AdminProductType,
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

// // Adicionando o beforeEach para redirecionar as páginas não permitidas
// router.beforeEach((to, from, next) => {
//   const allowedRoutes = ['/', '/about', '/contact']; // rotas permitidas
//   if (!allowedRoutes.includes(to.path)) {
//     next('/'); // Redireciona para a página home se a rota não estiver na lista permitida
//   } else {
//     next(); // Permite a navegação para as rotas permitidas
//   }
// });

export default router;
