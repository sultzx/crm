import mongoose from "mongoose"

const schema = new mongoose.Schema({
    department: String,
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {timestamps: true})

export default mongoose.model('Department', schema)
