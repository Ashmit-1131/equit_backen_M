const express =require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/User")

const { Authentication } = require("./middlewares/authentication")
const { taskRouter } = require("./routes/Task")


const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({
        message:"Your Api is running",
        status:1,
        error:false
    })
})

app.use("/user",userRouter)
app.use(Authentication)
app.use("/task",taskRouter)

app.listen(process.env.Port,async()=>{
    try{
await connection
        console.log("connected to mongodb")
    }catch(error){
        console.log("somthing went wrong"+error.message)
    }
    console.log("running on the server",process.env.Port)
})