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
            include: ChildTask
        })
        res.json(result)
    }
    catch(error) {
        res.status(500).send({message: "Internal server error"})
    }
}

export const changeStatus = async (req, res) => {
    try {
        await ChildTask.update({ status: req.body.status }, {
            where: {
                id: req.body.child_task_id,
                parentTaskId: req.body.parent_task_id
            }
        })
        res.status(200).json({message: 'successfully changed status'})
    }
    catch(error) {
        res.status(500).send({message: 'Internal server error'})
        console.log(error)
    }
}