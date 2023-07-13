const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model")

const userRoute = express.Router();

userRoute.post("/api/signup", async (req, res) => {
    const { email, password,confirmPassword} = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).send({ "msg": "User already there" })
        }
        if(password!==confirmPassword){
                    return res.status(400).send({"msg":"Password And ConfirmPassword Should Be Same"})
                }
                const hash = bcrypt.hashSync(password, 10);
                const hash2 = bcrypt.hashSync(confirmPassword,10);
                const newUser = new UserModel({email,password:hash,confirmPassword:hash2})
                await newUser.save();
                res.status(200).send({"msg":"Register Success",newUser})
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

userRoute.post("/api/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ "msg": "NO User There register first" })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const tokan = jwt.sign({UserId: `${user._id}`}, 'login', { expiresIn: "7d" })
                res.status(201).send({ "msg": "Login Success", tokan })
            }else{
                res.status(400).send({ "msg": "Wrong Password"}) 
            }
        });

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})



module.exports = { userRoute }
