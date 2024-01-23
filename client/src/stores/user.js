import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: JSON.parse(localStorage.getItem('token')) || null
    }),
    actions: {
        setUser(user, token) {
            this.user = user
            this.token = token
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(token))
        },
    },
    getters: {

    }
})