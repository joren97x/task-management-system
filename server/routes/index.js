import express from 'express'
import { register, login } from '../controllers/authController.js'
import { storeChildTask } from '../controllers/childTaskController.js'
import { storeParentTask } from '../controllers/parentTaskController.js'
import { getAllTasks } from '../controllers/taskController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/child-task', storeChildTask)
router.post('/parent-task', storeParentTask)

router.get('/tasks/:id', getAllTasks)

export default router