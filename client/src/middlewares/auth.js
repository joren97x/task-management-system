import { useRouter } from "vue-router"

export const auth = (to, from, next) => {
    console.log(to)

    const restrictedPaths = ['/login', '/register']

    const token = localStorage.getItem('token')
    if(token) {
        restrictedPaths.includes(to.path) ? useRouter().push('/') : next()
    }
    else {
        useRouter().push('/login')
    }
}