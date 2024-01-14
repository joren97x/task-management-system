import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const app = express()
app.use(express.json())
import { register } from './controllers/authController.js'
import { storeChildTask } from './controllers/childTaskController.js'
import { storeParentTask } from './controllers/parentTaskController.js'

let refreshTokens = []


app.post('/register', register)
app.post('/child-task', storeChildTask)
app.post('/parent-task', storeParentTask)

// app.post('/login', (req, res) => {
//     const user = { name: req.body.username }
//     const accessToken = generateAccessToken(user)
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//     refreshTokens.push(refreshToken)
//     res.json({accessToken: accessToken, refreshToken: refreshToken })
// })

// app.delete('/logout', (req, res) => {
//     refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//     res.sendStatus(204)
// })

// app.post('/token', (req, res) => {
//     const refreshToken = req.body.token
//     if(refreshToken == null) return res.sendStatus(401)
//     if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if(err) res.sendStatus(403)
//         const accessToken = generateAccessToken({name: user.name})
//         return res.json({accessToken: accessToken})
//     })
// })

// function generateAccessToken(user) {
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
// }

app.listen(4000, () => {
    console.log("server's listening at port 4000 bruh")
})