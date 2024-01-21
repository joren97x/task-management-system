import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'
import ParentTask from './ParentTask.js'

const User = sequelize.define('User', {
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

User.hasMany(ParentTask)

export default User