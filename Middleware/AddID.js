const jwt=require("jsonwebtoken")
require('dotenv').config()

const AddId=(req,res,next)=>{
    let token=req.headers.authorizion
    if(token){
        const decode=jwt.verify(token,process.env.secretKEY)
        if(decode){
            const author=decode._id
            req.body.author=author
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
    AddId
}