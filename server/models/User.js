import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'

export const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
// export const store = (data, res) => {
//     db.query("INSERT INTO users SET ?", [data], (err, result) => {
//         if(err) return res(err, null)
//         res(err, result)
//     })
// }
