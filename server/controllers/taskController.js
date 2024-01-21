import { Sequelize } from "sequelize"
import User from '../models/User.js'
const ParentTaskModule = await (import('../models/ParentTask.js'))
const ChildTaskodule = await (import('../models/ChildTask.js'))

const ParentTask = ParentTaskModule.default
const ChildTask = ChildTaskodule.default

export const getAllTasks = async (req, res) => {
    try {
        const result = await ParentTask.findAll({
            where: {
                userId: req.params.id
            },
            include: User
        })

        res.json(result)
    }
    catch(error) {
        console.log(error)
    }

}