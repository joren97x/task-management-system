<script setup>

    import { ref } from 'vue'
    import { useTaskStore } from '../stores/task.js'

    const taskStore = useTaskStore()
    const tab = ref(null)
    const levelIcons = new Map([
        ['High', { icon: 'mdi-arrow-up', color: 'red' }],
        ['Medium', { icon: 'mdi-minus', color: 'orange' }],
        ['Low', { icon: 'mdi-arrow-down', color: '' }],
    ])
    defineProps({ dummyTask: Object })

</script>

<template>
    <v-card width="370">
        <v-sheet color="blue-lighten-3" height="100" width="auto" class="header">
            <v-list-item :title="dummyTask.title" subtitle="/5" class="pt-6 ps-5">
                <template v-slot:prepend>
                    <p class="text-h3">1</p>
                </template>
                <template v-slot:append>
                    <!-- <v-menu location="bottom right" persistent>
                        <template v-slot:activator="{ props }"> -->
                            <v-btn icon="mdi-plus" @click="taskStore.showNewTaskDialog" color="blue-darken-2"></v-btn>
                        <!-- </template>
                        <v-card title="New task" width="350">
                            <v-card-item>
                                <v-text-field label="Title"></v-text-field>
                                <v-textarea label="Description"></v-textarea>
                            </v-card-item>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn>Add</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu> -->
                </template>
            </v-list-item>
        </v-sheet>
        <v-tabs v-model="tab" centered>
            <v-tooltip text="Tasks" location="top">
                <template v-slot:activator="{ props }">
                    <v-tab value="tasks" v-bind="props">
                        <v-icon>mdi-menu</v-icon>
                    </v-tab>
                </template>
            </v-tooltip>
            <v-tooltip text="Pending" location="top">
                <template v-slot:activator="{ props }">
                    <v-tab value="pending" v-bind="props">
                        <v-icon>mdi-circle-outline</v-icon>
                    </v-tab>
                </template>
            </v-tooltip>
            <v-tooltip text="Done" location="top">
                <template v-slot:activator="{ props }">
                    <v-tab value="done" v-bind="props">
                        <v-icon>mdi-check</v-icon>
                    </v-tab>
                </template>
            </v-tooltip>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="tasks">
                <p v-if="dummyTask.tasks.length == 0" class="text-center">No tasks found.</p>
                <v-card>
                    <v-list>
                        <v-list-item @click="taskStore.markAsDone(dummyTask.id, task.id)" :value="task.id" v-for="task in dummyTask.tasks" :key="task.id" :class="task.status ? 'text-grey' : ''">
                            <template v-slot:prepend>
                                <v-icon size="small">{{ task.status ? 'mdi-check-circle-outline' : 'mdi-circle-outline' }}</v-icon>
                            </template>
                            <p :class="task.status ? 'text-decoration-line-through' : ''"> {{ task.name }} </p>
                            <template v-slot:append>
                                <v-chip :color="levelIcons.get(task.level).color" :disabled="task.status" size="small">
                                    <v-icon start :icon="levelIcons.get(task.level).icon"></v-icon>
                                    {{ task.level }}
                                </v-chip>
                                <v-btn icon="mdi-chevron-right" @click="tab = 'info'" variant="text" size="small"></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-window-item>
            <v-window-item value="pending">
                <v-card>
                    <v-card-text>Pending</v-card-text>
                    <v-card-text>No pending tasks</v-card-text>
                </v-card>
            </v-window-item>
            <v-window-item value="done">
                <v-card>
                    <v-list>
                        <v-list-item @click="hey" value="done" class="text-grey">
                            <template v-slot:prepend>
                                <v-icon size="small">mdi-check-circle-outline</v-icon>
                            </template>
                            <p class="text-decoration-line-through">Touch grass.</p>
                            <template v-slot:append>
                                <v-chip color="orange" disabled size="small">
                                    <v-icon start icon="mdi-arrow-up-thick"></v-icon>
                                    Very high
                                </v-chip>
                                <v-btn icon="mdi-chevron-right" variant="text" size="small"></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-window-item>
            <v-window-item value="info">
                <v-card>
                    <v-card-title>
                        <v-list-item>
                            Touch grass
                            <template v-slot:append>
                                <v-tooltip text="Delete task" location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-btn size="small" icon="mdi-delete-empty-outline" v-bind="props" variant="text" color="red"></v-btn>
                                    </template>
                                </v-tooltip>
                            </template>
                        </v-list-item>
                    </v-card-title>
                    <v-card-text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, itaque! </v-card-text>
                </v-card>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<style scoped>

    .v-sheet {
        cursor: grab;
    }

</style>