import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import { User } from "./User.js"

export const ParentTask = sequelize.define('ParentTask', {
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