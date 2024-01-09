<script setup>

    import { reactive, ref } from 'vue'

    const showPassword = ref(false)
    const user = reactive({
        email: null,
        password: null
    })

</script>

<template>
    <v-container>
        <v-card title="Login" color="grey-lighten-3 mx-auto" width="50%">
            <v-card-item>
                <v-text-field label="Username" variant="solo" v-model="user.email"></v-text-field>
                <v-text-field label="Password" variant="solo" :type="showPassword ? '' : 'password' " v-model="user.password">
                    <template v-slot:append-inner>
                        <v-fade-transition>
                            <v-btn v-if="user.password" size="small" variant="text" @click="showPassword = !showPassword" :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"> </v-btn>
                        </v-fade-transition>
                    </template>
                </v-text-field>
            </v-card-item>
            <v-card-actions class="mx-3">
                Dont have an account? 
                <router-link to="/register" class="mx-2"> Register</router-link>
                <v-spacer/>
                <v-btn variant="flat" color="blue"> Login </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>