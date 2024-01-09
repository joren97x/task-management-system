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
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register.vue')
        },
        
    ]
})

export default router