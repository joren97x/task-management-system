import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/index.js'
import {authenticateToken} from './middlewares/authMiddleware.js'
import User from './models/User.js'
import { RefreshToken } from './models/RefreshToken.js'
import jwt from 'jsonwebtoken'
import sequelize from './config/sequelize.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

//model problem bruh ill fix it tom i think

sequelize.sync({ force: true }).then(() => {
    console.log('Database synchronized')
}).catch((error) => {
    console.error('Error syncing database:', error)
});

app.post('/register', async (req, res) => { 

    const { username, name, password } = req.body

    const userExists = await User.findOne({where: { username }})
    if(userExists) res.send({message: 'User with email already exists'})

    const result = await User.create({ username, name, password })
    .then((data) => {
        console.log(data.dataValues)
        const accessToken = generateAccessToken({ username, name, password })
        const refreshToken = jwt.sign({ username, name, password }, process.env.REFRESH_TOKEN_SECRET)
        RefreshToken.create({ userId: result.id, refreshToken, expirationDate: new Date() + 30 })
        res.json({accessToken: accessToken, user: data.dataValues })
    })
    .catch((err) => {
        console.log("error: ", err)
    })
})

app.post('/login', async (req, res) => { 
    console.log("there should be no middleware")
    try {
        const user = await User.findOne({ attributes: ['id', 'name', 'username'], where: { username: req.body.user.username }})
        if(user == null) {
            res.status(401).send({message: "Invalid credentials"})
        }
        else {
            const accessToken = generateAccessToken(user.dataValues)
            const refreshToken = jwt.sign(user.dataValues, process.env.REFRESH_TOKEN_SECRET)
            RefreshToken.create({ userId: user.dataValues.id, refreshToken, expirationDate: new Date() + 30 })
            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, user})
        }
    }
    catch(error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'})
}
app.use(authenticateToken)
app.use(router)


app.listen(3000, () => {
    console.log("server's listening at port 3000 bruh")
})