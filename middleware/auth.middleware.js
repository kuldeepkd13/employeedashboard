const jwt = require("jsonwebtoken")
const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return  res.status(400).send({"msg":"token not found"})
        }
        const decode = jwt.verify(token,"login");
        if(!decode){
            return  res.status(400).send({"msg":"invalid token"})
        }
        req.body.UserId=decode.UserId;
        next()
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}
module.exports={auth}