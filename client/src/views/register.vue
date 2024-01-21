<script setup>

    import { reactive, ref } from 'vue'
    import axios from 'axios'

    const showPassword = ref(false)
    const user = reactive({
        username: null,
        name: null,
        password: null
    })

    async function register() {
        const result = await axios.post('http://localhost:3000/register', {user})
        console.log(result)
    }

</script>

<template>
    <v-container>
        <v-card title="Register" color="grey-lighten-3 mx-auto" width="50%">
            <v-card-item>
                <v-text-field label="Username" variant="solo" v-model="user.username"></v-text-field>
                <v-text-field label="Name" variant="solo" v-model="user.name"></v-text-field>
                <v-text-field label="Password" variant="solo" :type="showPassword ? '' : 'password' " v-model="user.password">
                    <template v-slot:append-inner>
                        <v-fade-transition>
                            <v-btn v-if="user.password" size="small" variant="text" @click="showPassword = !showPassword" :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"> </v-btn>
                        </v-fade-transition>
                    </template>
                </v-text-field>
            </v-card-item>
            <v-card-actions class="mx-3">
                Already have an account? 
                <router-link to="/login" class="mx-2"> Login </router-link>
                <v-spacer/>
                <v-btn variant="flat" color="blue" @click="register"> Register </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>