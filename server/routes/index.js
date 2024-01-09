import express from 'express'
const router = express.Router()
const tasks = [
    {
        title: 'task 1',
        status: false
    },
    {
        title: 'task 2',
        status: false
    },
]

router.get('/tasks', (req, res) => {
    res.json(tasks)
})

export default router