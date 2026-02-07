const express = require("express")
const usermodal = require("../modals/user.modal")
const jwt = require("jsonwebtoken")
const crypto=require("crypto")

const authrouter = express.Router()

authrouter.post("/ragister", async (req, res) => {

    const { email, name, password } = req.body


    const isuserexist = await usermodal.findOne({ email })

    if (isuserexist) {
        res.status(400).json({
            message: "Email already exist"
        })
    }

        const hash= crypto.createHash("md5").update(password).digest("hex")

    const user = await usermodal.create({
        email, name, password:hash
    })

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "ragister successfully", user, token
    })


})


authrouter.post("/protected", (req, res) => {
    console.log(req.cookies)

    res.status(200).json({
        message: "route is protected"
    })

})

authrouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await usermodal.findOne({ email })

    if (!user) {
       return res.status(404).json({
            message: "user is not exist pls enter correct email"
        })
    }

    const ispasswordmatched = user.password === crypto.createHash("md5").update(password).digest("hex")
    if (!ispasswordmatched) {
       return res.status(404).json({
            message: "passowrd is not correct"
        })
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "login successfully", user
    })

})




module.exports = authrouter