import ChildTask from "../models/ChildTask.js"

export const storeChildTask = async (req, res) => {
    console.log(req.body)
    const { parentTaskId, title, description, level } = req.body
    const result = await ChildTask.create({ parentTaskId, title, description, level })
    console.log(result)
}