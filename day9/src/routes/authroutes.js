const express = require("express")
const usermodal = require("../modals/user.modal")
const jwt = require("jsonwebtoken")

const authrouter = express.Router()

authrouter.post("/ragister", async (req, res) => {

    const { email, name, password } = req.body


    const isuserexist = await usermodal.findOne({ email })

    if (isuserexist) {
        res.status(400).json({
            message: "Email already exist"
        })
    }

    const user = await usermodal.create({
        email, name, password
    })

    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET
    )
    res.cookie("jwt_token",token)

    res.status(200).json({
        message: "ragister successfully", user,token
    })


})


module.exports = authrouter