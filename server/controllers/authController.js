import { User } from '../models/User.js'
import { RefreshToken } from '../models/RefreshToken.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

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
}

export const login = async (req, res) => {
    // const user = { name: req.body.username }
    const user = await User.findOne({where: { username: req.body.username }})
    if(user == null) res.send({message: "Invalid credentials"})
    console.log(user.dataValues)
    const accessToken = generateAccessToken(user.dataValues)
    const refreshToken = jwt.sign(user.dataValues, process.env.REFRESH_TOKEN_SECRET)
    RefreshToken.create({ userId: user.dataValues.id, refreshToken, expirationDate: new Date() + 30 })
    res.json({accessToken: accessToken, refreshToken: refreshToken })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}