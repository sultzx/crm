import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: String,
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    maker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
}, {
    timestamps: true
})

export default mongoose.model('Chat', schema)