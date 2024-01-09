<script setup>

    import { useCounterStore } from '../stores/counter.js'
    import { useTaskStore } from '../stores/task.js'
    import taskCard from '../components/task-card.vue'

    const taskStore = useTaskStore()
    import {reactive } from 'vue'
    const counterStore = useCounterStore()

    const data = reactive([
                {
                    objectParameter1: 'anyThing',
                    objectParamerter2: 'anyThing2'
                },{
                    objectParameter1: 'anyThing3',
                    objectParamerter2: 'anyThing4'
                },

            ])

</script>

<template>
    <v-container>
        <router-link to="/">
            Home |
        </router-link>
        <router-link to="/about">
            About
        </router-link>
        <p class="text-h1"> About page</p>
    </v-container>
</template>