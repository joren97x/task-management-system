<script setup>
    import { useTaskStore } from '../stores/task.js'
    import { useUserStore } from '@/stores/user.js'
    import taskCard from '../components/task-card.vue'
    import { ref, onMounted } from 'vue'
    import { useTheme } from 'vuetify'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    const router = useRouter()
    const theme = useTheme()
    const taskStore = useTaskStore()
    const userStore = useUserStore()
    const showNewTaskTab = ref(false)
    const newTaskTitle = ref('')
    const darkMode = ref(false)

    onMounted(async() => {
        try {
            const tasks = await axios.get(`http://localhost:3000/tasks/${userStore.user.id}`, {
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            })
            tasks.data.forEach(task => {
                taskStore.push(task)
            })
        }
        catch(error) {
            if(error.response.status == 403) {
                logout() 
                //john eben ligan
            }
        }
    })

    async function createNewTasksTab() {
        try {
            await axios.post("http://localhost:3000/parent-task", 
                {
                    userId: userStore.user.id,
                    title: newTaskTitle.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.token}`
                    }
                }
            )
            .then((response) => {
                newTaskTitle.value = ''
                showNewTaskTab.value = false
                taskStore.push(response.data.parentTask)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    function toggleTheme () {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }

    function logout() {
        localStorage.removeItem('token')
        router.push('/login')
    }

</script>
<template>
    <v-container class="con">
        <v-list-item class="mb-6">
            <template v-slot:prepend>
                <v-avatar>
                    <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Microsoft_To-Do_icon.svg/512px-Microsoft_To-Do_icon.svg.png"></v-img>
                </v-avatar>
                <p class="text-h5 font-weight-bold ms-3">To-do app</p> 
            </template>
            <template v-slot:append>
                <v-switch v-model="darkMode" hide-details inset @click="toggleTheme">
                    <template v-slot:prepend>
                        Dark mode
                    </template>
                </v-switch>
                <v-btn variant="text" @click="logout" icon="mdi-logout" color="red"></v-btn>
            </template>
        </v-list-item>
        <v-row>
            <VDContainer :animation="true" :data=taskStore.tasks v-if="taskStore.tasks" type="sort" @getData=funcName class="dragContainer">
                <template v-slot:VDC="{data, index}">
                    <v-col cols="4">
                        <taskCard :task="data" :index="index" />
                    </v-col>
                </template>
            </VDContainer>
            <v-col cols="4">
                <v-card color="blue-lighten-3 new-task-tab" width="370">
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

<style scoped>
    .new-task-tab {
        cursor: pointer;
    }
</style>