import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Layouts',
        component: () => import(/* webpackChunkName: "about" */ '@/views/layouts/index.vue'),
        children: [
            {
                path: '/feedback',
                name: 'Feedback',
                component: () => import(/* webpackChunktitle: "about" */ '@/views/feedback/index.vue')
            }
        ]
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
