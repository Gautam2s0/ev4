const express=require("express")
const cors=require("cors")
require("dotenv").config()
const port =process.env.port
const { Postroute}=require("./Routers/PostRouter")
const {userRouter} =require("./Routers/userRouter")
const {connection}=require("./configs/db")

const {Auth}=require("./Middleware/userAuth")
// const {AddId}=require("./Middleware/AddID")

const app=express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("ev home page")
})
 
app.use("/users",userRouter)
// app.use(Auth)
// app.use(AddId)
app.use("/posts",Auth,AddId,Postroute)
app.listen(port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log(`server is running at port ${port}`)
})