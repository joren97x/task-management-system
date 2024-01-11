import db from '../config/database.js'

export const store = (data, res) => {
    db.query("INSERT INTO users SET ?", [data], (err, result) => {
        if(err) return res(err, null)
        res(err, result)
    })
}
