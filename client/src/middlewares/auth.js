import { useRouter } from "vue-router"

const route = useRouter()

export const auth = (to, from, next) => {
    const token = localStorage.getItem('token')
    if(token) {
        route.push('/')
    }
    else {
       next()
    }
}