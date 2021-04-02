const express = require('express')
const router = express.Router()
const Message = require('../model/messagesModel')

//get all messages
router.get("/messages", async(req, res, next) => {
    try {
        const message = await Message.find()
        if (message == '') {
            return res.status(404).json({
                error: true,
                message: "No Messages Found .."
            })
        }
        res.json(message)
    } catch (e) {
        res.status(500).json({
            error: true,
            message: e.message
        })
    }

})

// add message
router.post("/addMessage", async(req, res, next) => {
    try {
        const message = await Message.create({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            message: req.body.message,


        })
        res.json(message)
    } catch (e) {
        next(e)
    }
})

//update message
router.put("/updateMessage/:id", async(req, res, next) => {
    try {
        const message = await Message.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            message: req.body.message,

        }, {
            new: true,
            useFindAndModify: false,
            upsert: true
        })

        res.json(message)
    } catch (e) {
        next(e)
    }
})


//delete message
router.delete("/deleteMessage/:id", async(req, res, next) => {
    try {
        const message = await Message.deleteOne({ _id: req.params.id })
        res.json(message)
    } catch (e) {
        next(e)
    }
})


module.exports = router