import mongoose from "mongoose"
import Order from "../model/Order.js"

export const create = async (req, res) => {
    try {
        const {title, description, deadline, performer} = req.body

        const document = new Order({
            customer: req.userId,
            title,
            description,
            deadline,
            performer
        })

        const order = await document.save()

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}

export const all = async (req, res) => {
    try {

        const orders = await Order.find().populate('customer').populate('performer').exec()

        res.status(200).json(orders)

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}

export const setStatus = async (req, res) => {
    try {
        
        const {orderId, status} = req.body

        await Order.updateOne({
            _id: orderId
        }, {
            status: status
        })

        res.status(200).json({
            message: 'Тапсырыс дәрежесі өзгерді'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}