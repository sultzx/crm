import express from 'express'

import * as validation from '../service/validations.js'
import validationHandler from '../service/validationHandler.js'
import * as controller from '../controller/user.controller.js'
import checkAuth from '../middleware/checkAuth.js'

const userRouter = express.Router()

userRouter.post('/signup', validation.registration, validationHandler, controller.signup)
userRouter.post('/signin', validation.login, validationHandler, controller.signin)
userRouter.get('/me', checkAuth, controller.me)
userRouter.patch('/me/update', checkAuth, controller.update)
userRouter.patch('/set-status', checkAuth, controller.setStatus)
userRouter.get('/all', checkAuth, controller.all)

export default userRouter