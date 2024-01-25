import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'

const userStore = useUserStore()

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
    }),
    actions: {
        push(task) {
            this.tasks.push(task)
        },
        deleteParentTask(index) {
            this.tasks.splice(index, 1)
        },
        changeStatus(status, parentTask_id, childTask_id) {
            console.log(userStore.token)
            axios.put('http://localhost:3000/change-status', {status: status, parent_task_id: parentTask_id, child_task_id: childTask_id}, {
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            })
            .then((data) => {
                console.log("SUCESS PRE")
                console.log(data)
                const parentTaskIndex = this.tasks.findIndex(task => task.id === parentTask_id);
                if (parentTaskIndex !== -1) {
                    const childTaskIndex = this.tasks[parentTaskIndex].child_tasks.findIndex(childTask => childTask.id === childTask_id);
                    if (childTaskIndex !== -1) {
                        this.tasks[parentTaskIndex].child_tasks[childTaskIndex].status = !this.tasks[parentTaskIndex].child_tasks[childTaskIndex].status;
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
    
})