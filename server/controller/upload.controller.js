
import Order from "../model/Order.js"
import User from "../model/User.js"

export const uploadAvatar = async (req, res) => {
    const url = `/uploads/avatars/${req.file.filename}`
    await User.updateOne({
        _id: req.userId
    }, {
        avatar: url
    })
    res.json({
        url: url
    })
}

export const uploadFile = async (req, res) => {

    const url = `/uploads/files/${req.file.filename}`

    const user =  await User.findById(req.userId)

    user.files.push(url)

    await user.save()

    res.json({
        url: url
    })
    
}

export const uploadOrder = async (req, res) => {
    
    const url = `/uploads/orders/${req.file.filename}`

    const id = req.params.id

    console.log(id, req.file.filename)

    const monitoring = await Order.findById(id)

     monitoring.files.push({
        name: req.file.originalname,
        url: url
     })

     await monitoring.save()

    res.json({
        url: url
    })
}