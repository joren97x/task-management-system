import { DataTypes } from "sequelize"
import sequelize from "../config/sequelize.js"
import User from "./User.js"

export const RefreshToken =  sequelize.define('refresh_token', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    issuedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
})