const jwt=require("jsonwebtoken")
require('dotenv').config()

const Auth=(req,res,next)=>{
    let token=req.headers.authorizion
    if(token){
        const decode=jwt.verify(token,process.env.secretKEY)
        if(decode){
            next()
        }
        else{
            res.send({
                msg:"login fisrt"
            })
        }
    }
    else{
        res.send({
            msg:"login fisrt"
        })
    }
    
}
module.exports={
    Auth
}