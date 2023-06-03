import mongoose from "mongoose"

import Chat from "../model/Chat.js"
import Message from "../model/Message.js"

export const createChat = async (req, res) => {
    try {
        const userId = req.userId

        const {name, order, recipient} = req.body

        const document = new Chat({
            name,
            maker: userId,
            order,
            recipient
        })

        const chat = await document.save()

        res.status(200).json(chat)

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        
        const chats = await Chat.find().populate('maker').populate('recipient').populate('messages').populate('order').exec()

        res.status(200).json(chats)

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const {id} = req.params

        console.log(id)

        const chat = await Chat.findById(id).populate('maker').populate({
            path:'messages',
            model:'Message',
            populate:{
                model:'User',
                path:'sender'
            }
        }).populate('order').exec()

        res.status(200).json(chat)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {sender, content} = req.body

        const chat_id = req.params.id

        console.log(chat_id, sender, content)

        const document = new Message({
            sender,
            content
        })

        const message = await document.save()

        const chat = await Chat.findById(chat_id)

        chat.messages.push(message)

        await chat.save()

        res.status(200).json(chat)

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}

export const allMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('sender').exec()

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}