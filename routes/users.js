import express from "express"
import { PrismaClient } from "@prisma/client";

const userRouter = express.Router()
const prisma = new PrismaClient();
userRouter.use(express.json());


userRouter.post("/create", async (req,res)=>{
    try{
   const {username, email, password } = req.body
   const user = await prisma.user.create({
    data:{
        username: username,
        email: email,
        password: password
    }
   })
}
catch(err){
    console.log("deu erro: "+err)
}
}) 

userRouter.get("/users", async (req,res)=>{
    const users = await prisma.user.findMany()
    res.json(users)

})

export default userRouter;