import ParentTask from "./ParentTask.js"
import ChildTask from "./ChildTask.js"
import User from "./User.js"

// ParentTask.associate = models => {
//     ParentTask.hasMany(models.ChildTask)
//     ParentTask.belongsTo(models.User)
// }

// ChildTask.associate = models => {
//     ChildTask.belongsTo(models.ParentTask)
// }

// User.associate = models => {
//     User.hasMany(models.ParentTask)
// }
User.hasMany(ParentTask)

ChildTask.belongsTo(ParentTask)

ParentTask.hasMany(ChildTask)
ParentTask.belongsTo(User)

export { ParentTask, ChildTask, User }