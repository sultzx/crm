import express from 'express'

import * as controller from '../controller/chat.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const chatRouter = express.Router()

chatRouter.post('/', checkAuth, controller.createChat)
chatRouter.get('/all', checkAuth, controller.getAll)
chatRouter.get('/:id', checkAuth, controller.getOne)
chatRouter.post('/:id/message', checkAuth, controller.sendMessage)

export default chatRouter