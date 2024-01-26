<script setup>

    import { ref, computed, reactive } from 'vue'
    import { useTaskStore } from '../stores/task.js'
    import { useUserStore } from '@/stores/user'
    import { format } from 'date-fns'
    import axios from 'axios'
    const prop = defineProps({ task: Object, index: Number })

    const userStore = useUserStore()
    const taskStore = useTaskStore()
    const newChildTaskDialog = ref(false)
    const deleteTaskDialog = ref(false)
    const deleteParentTaskDialog = ref(false)
    const tab = ref(null)
    const taskInfo = ref(null)
    const message = ref(null)
    const snackbar = ref(false)

    const taskForm = reactive({
        parentTaskId: prop.task.id,
        title: null,
        description: null,
        level: null
    })

    const levelIcons = new Map([
        ['High', { icon: 'mdi-arrow-up', color: 'red' }],
        ['Medium', { icon: 'mdi-minus', color: 'orange' }],
        ['Low', { icon: 'mdi-arrow-down', color: '' }],
    ])

    const completedTaskLength = computed(() => {
        return prop.task.child_tasks.filter(childTask => childTask.status).length
    })

    const completedTasks = computed(() => {
        return prop.task.child_tasks.filter(childTask => childTask.status)
    })

    const pendingTasks = computed(() => {
        return prop.task.child_tasks.filter(childTask => childTask.status == false)
    })

    function displayTaskInfo(task) {
        taskInfo.value = task
        tab.value = "info"
    }

    async function submitNewChildTask() {
        try {
            await axios.post("http://localhost:3000/child-task", taskForm, {
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            })
            .then((response) => {
                taskForm.description = null
                taskForm.title = null
                taskForm.level = null
                
                taskStore.tasks[prop.index].child_tasks.push({
                    ...response.data.task
                })
                message.value = response.data.message
                newChildTaskDialog.value = false
                snackbar.value = true
            })
            .catch((error) => {
                console.log(error)
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    async function deleteTask() {
        try {
            await axios.delete(`http://localhost:3000/delete-child-task/${taskInfo.value.id}`, {
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            })
            .then((response) => {
                deleteTaskDialog.value = false
                message.value = response.data.message
                snackbar.value = true
                taskStore.tasks[prop.index].child_tasks = prop.task.child_tasks.filter(childTask => childTask.id !== taskInfo.value.id)
                tab.value = "tasks"
            })
            .catch((error) => {
                console.log(error)
            }) 
        }
        catch(error) {
            console.log(error)
        }
    }

    async function deleteParentTask() {
        try {
            await axios.delete(`http://localhost:3000/delete-parent-task/${prop.task.id}`, {
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            })
            .then((response) => {
                deleteParentTaskDialog.value = false
                message.value = response.data.message
                snackbar.value = true
                taskStore.deleteParentTask(prop.index)
            })
            .catch((error) => {
                console.log(error)
            }) 
        }
        catch(error) {
            console.log(error)
        }
    }

</script>

<template>
    <v-card width="370">
        <v-sheet color="blue-lighten-3" height="100" width="auto" class="header">
            <v-list-item :title="task.title" :subtitle="`/${task.child_tasks.length}`" class="pt-6 ps-5">
                <template v-slot:prepend>
                    <p class="text-h3">
                        {{ completedTaskLength }}
                    </p>
                </template>
                <template v-slot:append>
                    <v-btn icon="mdi-plus" @click="newChildTaskDialog = true" class="me-2" color="blue-darken-2"></v-btn>
                    <v-btn icon="mdi-delete-empty-outline" @click="deleteParentTaskDialog = true" color="red"></v-btn>
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
                <p v-if="task.child_tasks.length == 0" class="text-center">No tasks found.</p>
                <v-card>
                    <v-list>
                        <v-slide-x-transition class="py-0" group>
                            <v-list-item @click="taskStore.changeStatus(!child_task.status , task.id, child_task.id)" :value="child_task.id" v-for="child_task in task.child_tasks" :key="child_task.id" :class="child_task.status ? 'text-grey' : ''">
                                <template v-slot:prepend>
                                    <v-icon size="small">{{ child_task.status ? 'mdi-check-circle-outline' : 'mdi-circle-outline' }}</v-icon>
                                </template>
                                <p :class="child_task.status ? 'text-decoration-line-through' : ''"> {{ child_task.title }} </p>
                                <template v-slot:append>
                                    <v-chip :color="levelIcons.get(child_task.level).color" :disabled="child_task.status" size="small">
                                        <v-icon start :icon="levelIcons.get(child_task.level).icon"></v-icon>
                                        {{ child_task.level }}
                                    </v-chip>
                                    <v-btn icon="mdi-chevron-right" @click.stop="displayTaskInfo(child_task)" variant="text" size="small"></v-btn>
                                </template>
                            </v-list-item>
                        </v-slide-x-transition>
                    </v-list>
                </v-card>
            </v-window-item>
            <v-window-item value="pending">
                <v-card>
                    <template v-slot:title>
                        <p>Pending</p>
                        <p v-if="pendingTasks.length <= 0" class="text-center text-body-2">No pending tasks</p>
                    </template>
                        <v-list>
                            <v-slide-x-transition class="py-0" group>
                                <v-list-item @click="taskStore.changeStatus(!child_task.status , task.id, child_task.id)" :value="child_task.id" v-for="child_task in pendingTasks" :key="child_task.id">
                                    <template v-slot:prepend>
                                        <v-icon size="small">mdi-circle-outline</v-icon>
                                    </template>
                                    <p>{{ child_task.title }} </p>
                                    <template v-slot:append>
                                        <v-chip :color="levelIcons.get(child_task.level).color" size="small">
                                            <v-icon start :icon="levelIcons.get(child_task.level).icon"></v-icon>
                                            {{ child_task.level }}
                                        </v-chip>
                                        <v-btn icon="mdi-chevron-right" @click.stop="displayTaskInfo(child_task)" variant="text" size="small"></v-btn>
                                    </template>
                                </v-list-item>
                            </v-slide-x-transition>
                        </v-list>
                </v-card>
            </v-window-item>
            <v-window-item value="done">
                <v-card>
                    <template v-slot:title>
                        <p>Completed </p>
                        <p v-if="completedTasks.length <= 0" class="text-center text-body-2">No completed tasks</p>
                    </template>
                        <v-list>
                            <v-slide-x-transition class="py-0" group>
                                <v-list-item @click="taskStore.changeStatus(!child_task.status , task.id, child_task.id)" :value="child_task.id" v-for="child_task in completedTasks" :key="child_task.id" class="text-grey">
                                    <template v-slot:prepend>
                                        <v-icon size="small">mdi-check-circle-outline</v-icon>
                                    </template>
                                    <p class="text-decoration-line-through">{{ child_task.title }} </p>
                                    <template v-slot:append>
                                        <v-chip :color="levelIcons.get(child_task.level).color" size="small" disabled>
                                            <v-icon start :icon="levelIcons.get(child_task.level).icon"></v-icon>
                                            {{ child_task.level }}
                                        </v-chip>
                                        <v-btn icon="mdi-chevron-right" @click.stop="displayTaskInfo(child_task)" variant="text" size="small"></v-btn>
                                    </template>
                                </v-list-item>
                            </v-slide-x-transition>
                        </v-list>
                </v-card>
            </v-window-item>
            <v-window-item value="info">
                <v-card>
                    <v-card-title>
                        <v-list-item>
                            {{ taskInfo.title }}
                            <template v-slot:append>
                                <v-tooltip text="Delete task" location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-btn @click="deleteTaskDialog = true" size="small" icon="mdi-delete-empty-outline" v-bind="props" variant="text" color="red"></v-btn>
                                    </template>
                                </v-tooltip>
                            </template>
                        </v-list-item>
                    </v-card-title>
                    <v-card-text> {{ taskInfo.description }} </v-card-text>
                    <v-card-actions>
                        <p>
                            Level
                            <v-chip>{{ taskInfo.level }}</v-chip>
                        </p>
                        <p>
                            Created at 
                            {{ format(new Date(taskInfo.createdAt), 'PPP') }}
                        </p>
                    </v-card-actions>
                </v-card>
            </v-window-item>
        </v-window>
        <v-dialog v-model="newChildTaskDialog">
            <v-card title="New child task">
                <v-card-item>
                    <v-alert icon="mdi-alert">
                        This will insert a new task inside the <strong>{{ task.title }}</strong>
                    </v-alert>
                </v-card-item>
                <v-card-item>
                    <v-text-field label="Title" variant="solo" v-model="taskForm.title"></v-text-field>
                    <v-text-field label="Description" variant="solo" v-model="taskForm.description"></v-text-field>
                    <v-select label="Level" variant="solo" :items="['High', 'Medium', 'Low']" v-model="taskForm.level"></v-select>
                </v-card-item>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="newChildTaskDialog = false">Close</v-btn>
                    <v-btn color="green" @click="submitNewChildTask">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteTaskDialog">
            <v-card title="Delete child task">
                <v-card-item>
                    <v-alert icon="mdi-alert" color="red-lighten-2">
                        Delete <strong>{{ taskInfo.title }}</strong>?
                    </v-alert>
                </v-card-item>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="deleteTaskDialog = false">Close</v-btn>
                    <v-btn color="red" @click="deleteTask">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteParentTaskDialog">
            <v-card title="Delete parent task">
                <v-card-item>
                    <v-alert icon="mdi-alert" color="red-lighten-2">
                        Delete <strong>{{ task.title }}</strong>?
                    </v-alert>
                </v-card-item>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="deleteParentTaskDialog = false">Close</v-btn>
                    <v-btn color="red" @click="deleteParentTask">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar">
            {{ message }}
        </v-snackbar>
    </v-card>
    
</template>

<style scoped>

    .v-sheet {
        cursor: grab;
    }

</style>