import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import { User } from "./User.js"
import ChildTask from "./ChildTask.js"

const defineParentTask = async() => {
    await sequelize.sync()

    const ParentTask = sequelize.define('parent_task', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    ParentTask.hasMany(ChildTask, { foreignKey: 'parentTaskId' })
    return ParentTask
}
    
export default defineParentTask


