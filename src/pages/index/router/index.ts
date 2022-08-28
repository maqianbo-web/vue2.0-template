import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Map',
        meta: {
            name: '地图',
            icon: 'el-icon-menu',
        },
        component: resolve => require(['../views/map/index.vue'], resolve),
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
