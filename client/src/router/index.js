import {createRouter, createWebHistory, useRouter} from 'vue-router'

import { auth } from '@/middlewares/auth.js'
const router = createRouter({
    history: createWebHistory(null),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home.vue'),
            beforeEnter: auth
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/about.vue'),
            beforeEnter: auth
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
            beforeEnter: (to, from, next) => {
                const route = useRouter()
                const token = localStorage.getItem('token')
                if(token) {
                    route.push('/')
                }
                else {
                    next()
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register.vue'),
            beforeEnter: (to, from, next) => {
                const route = useRouter()
                const token = localStorage.getItem('token')
                if(token) {
                    route.push('/')
                }
                else {
                    next()
                }
            }
        },
        
    ]
})

export default router