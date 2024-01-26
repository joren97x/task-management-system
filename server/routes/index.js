import express from 'express'
// import { register, login } from '../controllers/authController.js'
import { storeChildTask, deleteChildTask } from '../controllers/childTaskController.js'
import { storeParentTask, deleteParentTask } from '../controllers/parentTaskController.js'
import { getAllTasks, changeStatus } from '../controllers/taskController.js'
import { deleteRefreshToken } from '../controllers/refreshTokenController.js'

const router = express.Router()

// router.post('/register', register)
// router.post('/login', login)
router.post('/child-task', storeChildTask)
router.delete('/delete-refresh-token/:id', deleteRefreshToken)
router.post('/parent-task', storeParentTask)
router.put('/change-status', changeStatus)
router.delete('/delete-child-task/:id', deleteChildTask)
router.delete('/delete-parent-task/:id', deleteParentTask)
router.get('/tasks/:id', getAllTasks)

export default router