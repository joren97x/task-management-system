import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        newTaskDialog: false,
        dummyTasks: [
            {
                id: 1,
                title: 'Random tasks',
                tasks: [
                    {
                        id: 1,
                        name: 'touch grass',
                        description: 'touch grass',
                        level: 'High',
                        status: false,
                        created_at: new Date()
                    },
                    {
                        id: 2,
                        name: 'manglaba',
                        description: 'manglaba',
                        level: 'Medium',
                        status: true,
                        created_at: new Date()
                    },
                    {
                        id: 3,
                        name: 'drink water',
                        description: 'drink water',
                        level: 'High',
                        status: false,
                        created_at: new Date()
                    }
                ]
            },
            {
                id: 2,
                title: 'Default tasks',
                tasks: [
                    {
                        id: 1,
                        name: 'eat egg',
                        description: 'eat egg',
                        level: 'Medium',
                        status: false,
                        created_at: new Date()
                    },
                    {
                        id: 2,
                        name: 'listen to music',
                        description: 'listen to music',
                        level: 'Low',
                        status: false,
                        created_at: new Date()
                    },
                    {
                        id: 3,
                        name: 'stare at the wall',
                        description: 'stare at the wall',
                        level: 'High',
                        status: false,
                        created_at: new Date()
                    },
                    {
                        id: 4,
                        name: 'stare at the wall',
                        description: 'stare at the wall',
                        level: 'High',
                        status: false,
                        created_at: new Date()
                    }
                ]
            },
        ]
    }),
    actions: {
        markAsDone(parentTask_id, childTask_id) {
            console.log(parentTask_id)
            console.log(childTask_id)
        },
        newTasks(title) {
            this.dummyTasks.push({
                id: Math.random() * 100,
                title: title,
                tasks: []
            })
        },
        showNewTaskDialog() {
            this.newTaskDialog = !this.newTaskDialog
        }
    },
    getters: {
        // getPendingTasks: (state) => (tasks_id) => {
        //     console.log(tasks_id)
        //     for(const taskGroup of state.dummyTasks) {
        //         if(taskGroup.id == tasks_id) {
        //             for(const task in taskGroup.tasks) {
        //                 if(task.status == true) {
        //                     return task
        //                 }
        //             }
        //         }
        //     }
        // }
    }
})