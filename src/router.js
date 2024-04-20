import { createWebHistory, createRouter } from "vue-router";
import Cookie from 'js-cookie'
import LayoutDefault from './layouts/LayoutDefault.vue';
import LayoutCMS from './layouts/LayoutCMS.vue';

const routes = [
    {
        path: "/admin",
        component: LayoutCMS,
        children: [
            { path: '', name: 'admin', component: () => import('./pages/cms/PostTypeCms.vue') },
            { path: 'tags', component: () => import('./pages/cms/TagsCms.vue') },
            { path: 'entities-cms', component: () => import('./pages/cms/EntityCms.vue') }
        ]
    },
    {
        path: "/",
        redirect: 'list',
        component: LayoutDefault,
        children: [
            { path: 'list', component: () => import('./pages/user/Home.vue') },
            { path: 'list/:id/:slug', component: () => import('./pages/user/DetailPost.vue') }
        ]
    },
    {
        path: "/login",
        name: 'login',
        component: () => import("./pages/cms/Login.vue")
    },

    { path: '/:pathMatch(.*)', redirect: '/404' },
    { path: '/404', name: 'pageNotFound', component: () => import("./pages/PageNotFound.vue") }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const isAuthenticated = Cookie.get("access_token");
    if (!isAuthenticated && to.path.includes('admin')) {
        return { name: 'login' }
    }
})
export default router;