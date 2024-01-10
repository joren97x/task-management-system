import express from 'express'

import jwt from 'jsonwebtoken'

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

router.post('/login', (req, res) => {
    const user = { name: req.body.username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json(accessToken)
})

router.get('/tasks', (req, res) => {
    res.json(tasks)
})

export default router