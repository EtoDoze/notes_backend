import express from "express"
import { PrismaClient } from "@prisma/client";

const userRouter = express.Router()
const prisma = new PrismaClient();
userRouter.use(express.json());


userRouter.post("/create", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });

        res.status(201).json(user); // Retorna o usuário criado
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

userRouter.get("/users", async (req,res)=>{
    const users = await prisma.user.findMany()
    res.json(users)

})

export default userRouter;