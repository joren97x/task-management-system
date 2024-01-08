<script setup>

    import { useCounterStore } from '../stores/counter.js'
    const counterStore = useCounterStore()

</script>

<template>
    <v-container>
        
        <router-link to="/">
            Home |
        </router-link>
        <router-link to="/about">
            About
        </router-link>
        <v-chip>{{ counterStore.count }}</v-chip>
        <v-btn @click="counterStore.increment">+</v-btn>
        <v-btn @click="counterStore.decrement">-</v-btn>
        
    </v-container>
</template>