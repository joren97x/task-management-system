import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/index.js'
import {authenticateToken} from './middlewares/authMiddleware.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(authenticateToken)

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if(token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403)
//         req.user = user
//         console.log(user)
//         next()
//     })
// }

app.get('/tasks', authenticateToken, (req, res) => {
    console.log(req.user)
    res.json(tasks.filter(task => task.username === req.user.name))
})

app.listen(3000, () => {
    console.log("server's listening at port 3000 bruh")
})