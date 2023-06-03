import mongoose from "mongoose"

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hashedPassword: String,
    lastname: String,
    firstname: String,
    patronymic: String,
    phone: String,
    birthday: Date,
    gender: String,
    bio: String,
    job: String,
    organization: {
        type: Object,
        name: String,
    },
    address: {
        type: Object,
        region: String,
        city: String,
        street: String,
        home: String,
        apartment: String,
    },
    files: [],
    status: {
        type: String,
        default: 'inactive'
    },
    role: {
        type: String,
        default: 'freeman'
    },
    avatar: String,
})

export default mongoose.model('User', schema)