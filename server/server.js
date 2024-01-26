import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/index.js'
import {authenticateToken} from './middlewares/authMiddleware.js'
import { User, ParentTask, ChildTask } from './models/associate.js'
import { RefreshToken } from './models/RefreshToken.js'
import jwt from 'jsonwebtoken'
import sequelize from './config/sequelize.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized')
    startServer()
}).catch((error) => {
    console.error('Error syncing database:', error)
});

function startServer() {
    app.post('/register', async (req, res) => { 
        const {user} = req.body
        // const { username, name, password } = req.body
    
        const userExists = await User.findOne({where: { username: user.username }})
        if(userExists) return res.status(409).send({message: 'Username already exists'})
    
        try {
            await User.create(user)
            .then((data) => {
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user , process.env.REFRESH_TOKEN_SECRET)
                RefreshToken.create({ userId: data.id, refreshToken, expirationDate: new Date() + 30 })
                res.json({accessToken: accessToken, user: {id: data.id, name: data.name, username: data.username} })
            })
        }
        catch(error) {
            res.status(500).send({message: "Internal server error"})
        }
    })
    
    app.post('/login', async (req, res) => { 
        console.log("there should be no middleware")
        try {
            const user = await User.findOne({ attributes: ['id', 'name', 'username'], where: { username: req.body.user.username, password: req.body.user.password }})
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
}