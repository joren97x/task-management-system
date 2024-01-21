import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import ChildTask from "./ChildTask.js"
import User from "./User.js"

const ParentTask = sequelize.define('parent_task', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

ParentTask.hasMany(ChildTask)
ParentTask.belongsTo(User)

export default ParentTask


