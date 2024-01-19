import {createRouter, createWebHistory} from 'vue-router'
import { authenticateToken } from '../../../server/middlewares/authMiddleware.js'
import { useRouter } from 'vue-router'
import { auth } from '@/middlewares/auth.js'

const route = useRouter()
const router = createRouter({
    history: createWebHistory(null),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home.vue'),
            beforeEnter: authenticateToken
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/about.vue'),
            beforeEnter: authenticateToken
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
            beforeEnter: auth
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register.vue'),
            beforeEnter: auth
        },
        
    ]
})

export default router