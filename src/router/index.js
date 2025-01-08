import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/Layout.vue";
import Home from "../views/HomePage.vue";
import Login from "../views/LoginPage.vue"
import User from "../views/UserPage.vue"
import Register from "../views/RegisterPage.vue"
import About from "../views/AboutPage.vue"
import Contact from "../views/ContactPage.vue"

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
        ],
    },
]; const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;