import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'

import userRouter from './route/user.route.js'
import uploadRouter from './route/upload.route.js'
import orderRouter from './route/order.route.js'
import chatRouter from './route/chat.route.js'
import departmentRouter from './route/department.route.js'
import projectRouter from './route/project.route.js'
import reportRouter from './route/report.route.js'

const app = express()

const PORT = config.get('port')

app.use(express.json())

app.use('/uploads', express.static('uploads'))
app.use('/images', express.static('images'))

app.use(cors())

const start = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect(config.get('mongodbUrl'))
        console.log(`database OK\tname: ${mongoose.connection.name}`)
    } catch (error) {
        console.log(`database error\tmessage: ${error.message}`)
    }

    app.use('/api/upload', uploadRouter)
    app.use('/api/user', userRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/chat', chatRouter)
    app.use('/api/department', departmentRouter)
    app.use('/api/project', projectRouter)
    app.use('/api/report', reportRouter)

    app.listen(PORT, (error) => {
        if(error) {
            console.log(error.message)
        }
        console.log(`server OK\tport: ${PORT}`)
    })
}

start()