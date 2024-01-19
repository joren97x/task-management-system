import express from 'express'
import { register, login } from '../controllers/authController.js'
import { storeChildTask } from '../controllers/childTaskController.js'
import { storeParentTask } from '../controllers/parentTaskController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', (req, res) => {
    res.send("bruh?")
})
router.post('/child-task', storeChildTask)
router.post('/parent-task', storeParentTask)





export default router