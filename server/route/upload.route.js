import express from 'express'
import multer from 'multer'

import * as controllers from '../controller/upload.controller.js'
import checkAuth from '../middleware/checkAuth.js'
import storageService from '../service/diskStorage.js'

const uploadRouter = express.Router()

const uploadAvatar = multer({
    storage: storageService('avatars')
})

const uploadFiles = multer({
    storage: storageService('avatars')
})
const uploadOrder = multer({
    storage: storageService('orders')
})
uploadRouter.post('/avatar', checkAuth, uploadAvatar.single('image'), controllers.uploadAvatar)
uploadRouter.post('/files', checkAuth, uploadFiles.single('file'), controllers.uploadFile)
uploadRouter.post('/order/:id', checkAuth, uploadOrder.single('file'), controllers.uploadOrder)

export default uploadRouter 