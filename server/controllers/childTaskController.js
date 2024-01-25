import ChildTask from "../models/ChildTask.js"

export const storeChildTask = async (req, res) => {
    try {
        const { parentTaskId, title, description, level } = req.body
        const result = await ChildTask.create({ parentTaskId, title, description, level })
        res.status(200).send({message: "Inserted Successfully", task: result.dataValues})
    }
    catch(error) {
        res.status(500).send({message: "Internal Server error"})
        console.log(error)
    }
}

export const deleteChildTask = async(req, res) => {
    try {
        const result = await ChildTask.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send({message: "Deleted Successfully"})
        console.log(result)
    }
    catch(error) {
        res.status(500).send({message: "Internal Server error"})
    }
}