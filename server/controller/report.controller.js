import Report from "../model/Report.js";

export const create = async (req, res) => {
    try {
        
        const {respondentId, title, description} = req.body

        const document = new Report({
            demander: req.userId,
            respondent: respondentId,
            title,
            description
        })

        await document.save()

        res.status(200).json({
            message: 'Есеп сәтті құрылды'
        })


    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}

export const all = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('demander')
            .populate('respondent')
            .exec()

        res.status(200).json(reports)

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}

export const setResponse = async (req, res) => {
    try {
        
        const {reportId, response} = req.body

        await Report.updateOne({
            _id: reportId
        }, {
            response
        })

        res.status(200).json({
            message: 'Есеп сәтті толықтырылды'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Серверден қате келді'
        })
    }
}
