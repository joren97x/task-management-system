import { User } from '../models/User.js'

export const register = async (req, res) => {
    // store(req.body, (err, result) => {
    //     if(err) return res.sendStatus(500)
    //     const user = req.body
    //     const accessToken = generateAccessToken(user)
    //     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    //     refreshTokens.push(refreshToken)
    //     res.json({accessToken: accessToken, refreshToken: refreshToken })
    //     res.json(result)
    // })
    const { username, name, password } = req.body

    const userExists = await User.findOne({where: { username }})
    if(userExists) res.send({message: 'User with email already exists'})
    const result = await User.create({ username, name, password }).catch((err) => {
        console.log("ERror: ", err)
    })
    console.log(result)
}

export const login = (req, res) => {
    app.post('/login', (req, res) => {
        const user = { name: req.body.username }
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.json({accessToken: accessToken, refreshToken: refreshToken })
    })

}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}