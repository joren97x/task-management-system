import ParentTask from "../models/ParentTask.js"

export const storeParentTask = async (req, res) => {
    const { userId, title } = req.body
    const result = await ParentTask.create({ userId, title })
    console.log(result)
}