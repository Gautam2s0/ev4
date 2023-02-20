const express = require("express");
const router = express.Router();


router.get("/",async(req,res)=>{
  const query=req.query
  try{
    const data=await PostModel.find(query)
    res.send(data)
  }
  catch(err){
    res.send(err)
  }
})

router.post("/create",(req,res)=>{
  try{
    const post=new PostModel(req.body)
    await.save()
    res.send("note created")
  }
  catch(err){
    res.send(err)
  }
})

router.patch("/update/:id",async(req,res)=>{
  let payload=req.body
  id=req.params
  const existuser=await PostModel.find({_id:_id})
  const author=existuser.author
  const mauthor=req.body.author
  try{
    if(author===mauthor){
      await PostModel.findByIdAndUpdate({_id:id},payload)
      res.send("updated successfully")
    }
    else{
      res.send("you dont have access to preform")
    }

  }
  catch(err){
    res.send(err)
  }
  
})
router.delete("/delete/:id",async(req,res)=>{
  id=req.params
  const existuser=await PostModel.find({_id:_id})
  const author=existuser.author
  const mauthor=req.body.author
  try{
    if(author===mauthor){
      await PostModel.findByIdAndDelete({_id:id})
      res.send("deleted successfully")
    }
    else{
      res.send("you dont have access to preform")
    }

  }
  catch(err){
    res.send(err)
  }
  
})
router.get("/top",async(req,res)=>{
  try{
    let  data=await PostModel.find({no_if_comments})
    const result=data.sort((a,b)=>{
      return b.no_if_comments-a.no_if_comments
    })
    res.send(result[0])
  }
  catch(err){
    res.send(err)
  }
})

module.exports={router}