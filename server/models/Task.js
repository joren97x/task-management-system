// import { DataTypes } from "sequelize"
// import sequelize from "../config/sequelize.js"
// import User from "./User.js"

// const ChildTask = sequelize.define('child_task', {
//     parentTaskId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'ParentTask',
//             key: 'id'
//         }
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     level: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     },
// })


// const ParentTask = sequelize.define('parent_task', {
//     userId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'User',
//             key: 'id'
//         }
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

// ParentTask.hasMany(ChildTask)
// ParentTask.belongsTo(User)
// ChildTask.belongsTo(ParentTask)
// User.hasMany(ParentTask)

// export {ParentTask, ChildTask}


