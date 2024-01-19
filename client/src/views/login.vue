<script setup>

    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router';
    import axios from 'axios'

    const router = useRouter()
    const errorMsg = ref(null)
    const loading = ref(false)
    const showPassword = ref(false)
    const user = reactive({
        username: null,
        password: null
    })

    function login() {
        loading.value = true
        try {
            axios.post('http://localhost:3000/login', {user})
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log("erorr")
                errorMsg.value = err.response.data.message
                console.log(err)
            })
        }
        catch(error) {
            console.log(error)
        }
        loading.value = false
    }

</script>

<template>
    <v-container>
        <v-card title="Login" color="grey-lighten-3 mx-auto" width="50%">
            <v-card-item>
                <v-text-field :error="errorMsg" label="Username" variant="solo" v-model="user.username"></v-text-field>
                <v-text-field :error="errorMsg" label="Password" variant="solo" :type="showPassword ? '' : 'password' " v-model="user.password">
                    <template v-slot:append-inner>
                        <v-fade-transition>
                            <v-btn v-if="user.password" size="small" variant="text" @click="showPassword = !showPassword" :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"> </v-btn>
                        </v-fade-transition>
                    </template>
                </v-text-field>
                <p v-if="errorMsg" class="text-error">{{errorMsg}}</p>
            </v-card-item>
            <v-card-actions class="mx-3">
                Dont have an account? 
                <router-link to="/register" class="mx-2"> Register</router-link>
                <v-spacer/>
                <v-btn variant="flat" color="blue" @click="login" :loading="loading"> Login </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>