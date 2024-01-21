import { DataTypes } from 'sequelize'
import sequelize from '../config/sequelize.js'
// import ParentTask from './ParentTask.js'
// import { ParentTask } from './Task.js'

const User = sequelize.define('user', {
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

export default User