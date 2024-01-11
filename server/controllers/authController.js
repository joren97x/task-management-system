import { store } from "../models/User"

export const register = (req, res) => {
    store(req.body, (err, result) => {
        if(err) return res.sendStatus(500)
        res.json(result)
    })
}