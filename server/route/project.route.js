import express from 'express'

import * as controller from '../controller/project.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const projectRouter = express.Router()

projectRouter.post('/', checkAuth, controller.create)
projectRouter.get('/all', checkAuth, controller.getAll)
projectRouter.patch('/set-status', checkAuth, controller.setStatus)

export default projectRouter