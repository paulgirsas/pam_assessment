// Vendor Imports
import VueRouter from "vue-router";
import Vue from "vue";

// Helpers
import {requireAuthenticated} from "../routing/app.guards";

// Components
import Auth from "../containers/Auth.vue";
import Login from "../components/Login";
import Register from "../components/Register";
import Layout from "../containers/Layout";
import Home from "../containers/Home";
import LiveDraw from "../containers/LiveDraw";

Vue.use(VueRouter);

/**
 * The Application's Routes
 */
export const routes = [
    {
        path: '/auth',
        name: 'Authentication',
        component: Auth,
        children: [
            {path: 'login', component: Login},
            {path: 'register', component: Register}
        ]
    },
    {
        path: '/',
        component: Layout,
        beforeEnter: requireAuthenticated,
        children: [
            {path: '', component: Home},
            {path: 'live-draw', component: LiveDraw}
        ]
    }
];


/**
 * Link Active Class
 * @type {string}
 */
export const linkActiveClass = 'active';

/**
 * Router instance.
 * @type {VueRouter}
 */
export const router = new VueRouter({
    routes,
    linkActiveClass,
    mode: 'history'
});
