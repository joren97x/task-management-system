import ParentTask from "../models/ParentTask.js"
import ChildTask from "../models/ChildTask.js"
import { Sequelize } from "sequelize"

export const getAllTasks = async (req, res) => {
    try {
        const result = await ParentTask.findAll({
            where: {
                userId: req.params.id
            },
            include: [
                {
                    model: ChildTask,
                    where: {
                        parentTaskId: Sequelize.col('ParentTask.id')
                    }
                }
            ]
        })

        // console.log("FROM TASK CONTROLLER")
        // result.forEach(async (task) => {
        //     const child_tasks = await ChildTask.findAll({
        //         where: {
        //             parentTaskId: task.dataValues.id
        //         }
        //     })

        // })

        res.json(result)
    }
    catch(error) {
        console.log(error)
    }

}