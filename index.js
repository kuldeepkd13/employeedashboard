const express = require("express");
const {connection} = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { dashRoute } = require("./routes/employee.routes");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors")


const app = express()
app.use(express.json());
app.use(cors())
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("Employee")
})


app.use("/user",userRoute)
app.use("/dashboard",auth,dashRoute)

app.listen(process.env.Port,async()=>{
    try {
        await connection
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log(error.message)
        console.log("Not Connected to MongoDb")
    }
    console.log(`server is running at ${process.env.Port}`);
})