import mongoose from "mongoose"

const schema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    data: String
}, {
    timestamps: true
})

export default mongoose.model('Message', schema)