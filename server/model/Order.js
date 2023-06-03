import mongoose from "mongoose"

const schema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    deadline: String,
    files: [{
        type: Object,
        name: String,
        url: String
    }],
    performer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'opened'
    }
}, {timestamps: true})

export default mongoose.model('Order', schema)