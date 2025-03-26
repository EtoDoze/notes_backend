import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config(); // Não esqueça de configurar o dotenv!

const userRouter = express.Router();
const prisma = new PrismaClient();
userRouter.use(express.json());
const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/create", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verifica se o e-mail já está cadastrado
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "E-mail já cadastrado!" });
        }

        // Corrigido: await para hashPassword
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário com a senha hasheada
        const user = await prisma.user.create({
            data: { 
                username, 
                email, 
                password: hashedPassword // Usa a senha hasheada
            }
        });

        // Remove a senha do objeto de resposta por segurança
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json(userWithoutPassword);
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

userRouter.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { // Não retorna as senhas
                id: true,
                username: true,
                email: true,
                password: true,
                createdAt: true
            }
        });
        res.json(users);
    } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

export default userRouter;