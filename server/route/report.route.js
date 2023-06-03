import express from 'express'

import * as controller from '../controller/report.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const reportRouter = express.Router()

reportRouter.post('/', checkAuth, controller.create)
reportRouter.get('/all', checkAuth, controller.all)
reportRouter.patch('/', checkAuth, controller.setResponse)

export default reportRouter 