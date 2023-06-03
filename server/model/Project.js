import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: String,
    description: String,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deadline: Date,
    status: {
        type: String,
        default: 'opened'
    }
}, {
    timestamps: true
})

export default mongoose.model('Project', schema)
