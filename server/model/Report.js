import mongoose from "mongoose"

const schema = new mongoose.Schema({
    demander: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    respondent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    response: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

export default mongoose.model('Report', schema)