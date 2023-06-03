import express from 'express'

import * as controller from '../controller/department.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const departmentRouter = express.Router()

departmentRouter.post('/', checkAuth, controller.create)
departmentRouter.get('/all', checkAuth, controller.getAll)
departmentRouter.patch('/set-emp', checkAuth, controller.setEmp)

export default departmentRouter