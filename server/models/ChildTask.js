import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import { ParentTask } from "./ParentTask.js"

export const ChildTask = sequelize.define('child_task', {
    parentTaskId: {
        type: DataTypes.INTEGER,
        references: {
            model: ParentTask,
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