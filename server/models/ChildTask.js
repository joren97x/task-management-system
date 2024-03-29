import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import ParentTask from "./ParentTask.js"

const ChildTask = sequelize.define('child_task', {
    parentTaskId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'parent_tasks',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

// ChildTask.belongsTo(ParentTask)

export default ChildTask