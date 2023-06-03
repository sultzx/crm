import mongoose from "mongoose";
import Department from "../model/Department.js";
import User from "../model/User.js";

export const create = async (req, res) => {
    try {
        const { name } = req.body

        console.log(name)

        const document = new Department({
            department:  name
        })

        const department = await document.save()

        res.status(200).json(department)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getAll = async (req, res) => {
    try {
        
        const departments = await Department.find().populate('employees').exec()

        res.status(200).json(departments)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const setEmp = async (req, res) => {
    try {
        const {department_id, employee_id} = req.body

        const employee = await User.findById(employee_id)

        const department = await Department.findById(department_id).populate('employees').exec()

        department.employees.push(employee)

        await department.save()

        res.status(200).json(department)

    } catch (error) {
        res.status(500).json(error.message)
    }
}