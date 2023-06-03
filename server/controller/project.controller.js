import mongoose from "mongoose";
import Project from '../model/Project.js'
import User from "../model/User.js";

export const create = async (req, res) => {
    try {
        const { name, description, client, responsible, deadline } = req.body

        const document = new Project({
            name,
            description: description,
            client,
            manager: req.userId,
            responsible,
            deadline
        })

        const project = await document.save()

        res.status(200).json(project)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getAll = async (req, res) => {
    try {
        
        const projects = await Project.find().populate('client').populate('manager').populate('responsible').exec()

        res.status(200).json(projects)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const setStatus = async (req, res) => {
    try {
        const {project_id, status} = req.body

        await Project.updateOne({
            _id: project_id
        }, {
            status: status
        })

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}