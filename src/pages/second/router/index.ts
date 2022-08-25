import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        meta: {
            name: '首页',
            icon: 'el-icon-menu',
        },
        component: resolve => require(['../views/Home.vue'], resolve),
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            name: '分页',
            icon: 'el-icon-menu',
        },
        component: resolve => require(['../views/About.vue'], resolve),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
