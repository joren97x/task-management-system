<script setup>
    import { useTaskStore } from '../stores/task.js'
    import { ref } from 'vue'
    import taskCard from '../components/task-card.vue'

    const taskStore = useTaskStore()
    const showNewTaskTab = ref(false)
    const newTaskTitle = ref('')
    
    function createNewTasksTab() {
        taskStore.newTasks(newTaskTitle.value)
        newTaskTitle.value = ''
        showNewTaskTab.value = false
    }

</script>
<template>
    <v-container>
        <router-link to="/">
            Home | 
        </router-link>
        <router-link to="/about">
            About
        </router-link>
        <v-row>
            <v-col cols="4" v-for="dummyTask in taskStore.dummyTasks" :key="dummyTask.id">
                <taskCard :dummyTask="dummyTask" />
            </v-col>
            <v-col cols="4">
                <v-card color="blue-lighten-3">
                    <v-card-title class="text-center" v-if="!showNewTaskTab" @click.self="showNewTaskTab = !showNewTaskTab">
                        <v-icon>mdi-plus</v-icon>
                        New tasks tab
                    </v-card-title>
                    <v-card-item v-else>
                        <v-text-field variant="solo" v-model="newTaskTitle" label="New tasks title"></v-text-field>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="showNewTaskTab = false">Cancel</v-btn>
                            <v-btn @click="createNewTasksTab">Done</v-btn>
                        </v-card-actions>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>