import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(null),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/about.vue')
        },
        
    ]
})

export default router