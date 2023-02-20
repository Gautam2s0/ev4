
const express = require("express");
const { UserModel } = require("../Models/UserModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("users");
});
userRouter.post("/register", async (req, res) => {
  const { email, name, password, gender, age, city } = req.body;
  console.log(email,password,name,gender)
  const exist=await UserModel.find({email})
  
  try{
    if(exist.length>0){
        res.send({
            mag:'User already exist, please login'
        })
    }
    else{
        bcrypt.hash(password,6,async(err,hash)=>{
            if(hash){
                const user=new UserModel({ email, name, password:hash, gender, age, city } )
                await user.save()
                res.send("registration successfully done")
            }
            else{
                res.send("somnthing went wrong")
            }
        })
        
        
    }
    
  }
  catch{
    res.send("somnthing went wrong")
  }
  

});




userRouter.post("/login", async(req, res) => {

    const { email,password} = req.body;
  const exist=await UserModel.find({email})
  console.log(exist[0]._id)
  
  try{
    if(exist.length==0){
        res.send({
            mag:'User do not account, please register'
        })
    }
    else{
        bcrypt.compare(password,exist[0].password,async(err,hash)=>{
            if(hash){
              console.log(exist._id)
                token=jwt.sign({_id:exist[0]._id},process.env.secretKEY)
                
                res.send({msg:"login successfully done",token})
            }
            else{
                res.send("somnthing went wrong")
            }
        })
        
        
    }
    
  }
  catch{
    res.send("somnthing went wrong")
  }
  
});

module.exports = {
  userRouter,
};
