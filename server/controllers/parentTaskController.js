import ChildTask from "../models/ChildTask.js"
import ParentTask from "../models/ParentTask.js"

export const storeParentTask = async (req, res) => {
    try {
        const { userId, title } = req.body
        const result = await ParentTask.create({ userId, title })
        const task = await ParentTask.findOne(
        {
            where: {
                id: result.dataValues.id
            },
            include: ChildTask
        })

        res.status(200).send({message: "Added successfully", parentTask: task })
    }
    catch(error) {
        res.status(500).send({message: "Internal server error"})
        console.log(error)
    }
}

export const deleteParentTask = async (req, res) => {
    try {
        await ChildTask.destroy({
            where: {
                parentTaskId: req.params.id
            }
        })
        await ParentTask.destroy({
            where: {
                id: req.params.id
            },
        })
        res.status(200).send({message: "Deleted Successfully"})
    }
    catch(error) {
        console.log(error)
        res.status(500).send({message: "Internal Server error"})
    }
}