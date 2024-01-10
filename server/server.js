import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
// import router from './routes/index.js'
dotenv.config()
const app = express()
// app.use(router)
app.use(express.json())

const router = express.Router()
const tasks = [
    {
        title: 'task 1',
        username: "Joren",
        status: false
    },
    {
        title: 'task 2',
        username: "Hev",
        status: false
    },
]

app.post('/login', (req, res) => {
    const user = { name: req.body.username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    console.log(user)
    res.json({accessToken: accessToken})
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        console.log(user)
        next()
    })
}

app.get('/tasks', authenticateToken, (req, res) => {
    console.log(req.user)
    res.json(tasks.filter(task => task.username === req.user.name))
})

app.listen(3000, () => {
    console.log("server's listening at port 3000 bruh")
})